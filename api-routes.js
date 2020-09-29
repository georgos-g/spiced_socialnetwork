const express = require("express");
const router = new express.Router();

const db = require("./db.js");
const ses = require("./ses.js");

const passwords = require("./passwords.js");
const cryptoRandomString = require("crypto-random-string");
//AWS S3 Upload tools
const multer = require("multer");
const s3 = require("./s3.js");
const uidSafe = require("uid-safe");
const path = require("path");

router.post("/api/v1/register", (request, response) => {
    const { firstname, lastname, email, password } = request.body;

    passwords //passwords.js
        .hash(password)
        .then((password_hash) =>
            db.addNewUser(firstname, lastname, email, password_hash)
        )
        .then((addNewUser) => {
            request.session.userID = addNewUser.id;

            response.json({
                success: true,
                user: addNewUser,
            });
        })
        .catch((error) => {
            console.log(error);
            response.json({
                success: false,
                error: "All fields must be filled out.",
            });
        });
});

//Route for login

router.post("/api/v1/login", (request, response) => {
    //check if fields are filled
    const { email, password } = request.body;

    if (!email || !password) {
        return response.redirect("register", {
            error: "Required field/s are missing",
            email,
            password,
        });
    }
    //compare pasword_hash with DB
    db.getUserByEmail(email)
        .then((result) => {
            const userPasswordHashFromDB = result.password_hash;
            //hashing
            //If password and BD hash are equal
            passwords
                .compare(password, userPasswordHashFromDB)
                .then((isCorrect) => {
                    if (isCorrect) {
                        request.session.userID = result.id;
                        response.json({ success: true });
                    }
                });
        })
        .catch((error) => {
            console.log(error);

            response.json({
                success: false,
                error: "Your email or passwort are incorrect.",
            });
        });
});

//Route to reset password
router.post("/api/v1/password-reset/code", (request, response) => {
    const { email } = request.body;
    const secretCode = cryptoRandomString({ length: 6 });

    db.addPasswordReset(email, secretCode).then((result) => {
        if (result) {
            //send email with new password
            const emailBody = `Use this code <span>${secretCode}</span> to change your password.`;
            ses.send(email, "Password reset code", emailBody).then(() => {
                //send message
                response.json({ success: true });
            });
        } else {
            response.json({
                success: false,
                error: "Something did not worked out!",
            });
        }
    });
});

//Route for set new password
router.post("/api/v1/password-reset/set-password", (request, response) => {
    //get variables for email, code, new password from DB
    const { email, code, password } = request.body;

    //check if email belongs to any user
    db.getCodeByEmail(code, email).then((result) => {
        //check if code from db is the same as code from request
        if (result) {
            //hash the password
            db.getUserByEmail(email).then((user) => {
                const userID = user.id;
                passwords.hash(password).then((password_hash) => {
                    db.updatePassword(userID, password_hash).then((result) => {
                        response.json({ success: true });
                    });
                });
            });
        } else {
            response.json({ success: false, error: "Code invalid" });
        }
    });
});

//Server User Details
router.get("/api/v1/me", (request, response) => {
    const userID = request.session.userID;

    if (!userID) {
        return response.json({});
    } else {
        db.getUser(userID)

            .then((user) => {
                delete user.password_hash;
                response.json(user);
            })
            .catch((error) => {
                console.log("error", error);
                response.status(500).json(error);
            });
    }
});

//multer img upload
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 5242880, //5MB
    },
});

//upload files to AWS S3
router.post(
    "/api/v1/user/profile-upload",
    uploader.single("file"),
    (request, response) => {
        const s3ImageURL = s3.generateBucketURL(request.file.filename);

        s3.uploadFile(request.file)

            .then(() => {
                const {
                    firstname,
                    lastname,
                    email,
                    profile_picture_url,
                } = request.body;
                return db.addImage(s3ImageURL, request.session.userID);
            })

            .then((resultFromDb) => {
                response.json({
                    success: true,
                    //fileURL: s3ImageURL,
                    ...resultFromDb,
                });
            })

            .catch((error) => {
                console.log("error", error);
                response.status(500).json({
                    success: false,
                    error: error,
                });
            });
    }
);

//get image
router.get("/api/v1/user/image/:id", (request, response) => {
    db.getImage(request.params.id)
        .then((imageInfo) => {
            response.json(imageInfo);
        })
        .catch((error) => {
            response.status(500).json({
                success: false,
                error: error,
            });
        });
});

//Route to update bio
router.post("/api/v1/user/bio", (request, response) => {
    const { bio } = request.body;
    db.updateBio(request.session.userID, bio)

        .then((result) => {
            response.json({ success: true });
        })
        .catch((error) => {
            console.log("error", error);
            response.send({ success: false });
        });
});

//Other Profile
router.get("/api/v1/user/:id", (request, response) => {
    const userID = request.session.userID;

    if (!userID) {
        return response.send({ success: false });
    } else {
        db.getUser(request.params.id)
            .then((user) => {
                response.json(user);
            })

            .catch((error) => {
                response.status(500).json({
                    success: false,
                    error: error,
                });
            });
    }
});

//Find people
router.get("/api/v1/users/:query", (request, response) => {
    const query = request.params.query;
    if (!query) {
        return response.send({ success: false });
    } else {
        db.findUsers(query)
            .then((userID) => {
                response.json(userID);
            })
            .catch((error) => {
                console.log("error", error);
                response.status(500).json({
                    success: false,
                    error: error,
                });
            });
    }
});

//Friend Requests Button
const NO_REQUEST = "no-request";
const REQUEST_MADE_BY_YOU = "request-made-by-you";
const REQUEST_MADE_TO_YOU = "request-made-to-you";
const REQUEST_ACCEPTED = "request-accepted";

router.get(
    "/api/v1/friend-request/:other_user_id",
    async (request, response) => {
        const { userID } = request.session;
        const { other_user_id } = request.params;
        const friendRequest = await db.getFriendRequest(userID, other_user_id);

        if (!friendRequest) {
            return response.json({ status: NO_REQUEST });
        } else if (friendRequest.accepted) {
            return response.json({ status: REQUEST_ACCEPTED });
        } else if (friendRequest.to_id == userID) {
            return response.json({ status: REQUEST_MADE_TO_YOU });
        } else if (friendRequest.from_id == userID) {
            return response.json({ status: REQUEST_MADE_BY_YOU });
        }
    }
);
//Make Request
router.post(
    "/api/v1/friend-request/make/:other_user_id",
    (request, response) => {
        const { other_user_id } = request.params;
        const { userID } = request.session;

        db.addFriendRequest(other_user_id, userID)
            .then((other_user_id) => {
                response.json({
                    success: true,
                    status: REQUEST_MADE_BY_YOU,
                });
            })
            .catch((error) => {
                response.status(500).json({
                    success: false,
                    error: error,
                });
            });
    }
);

//Accept Request
router.post(
    "/api/v1/friend-request/accept/:other_user_id",
    (request, response) => {
        const { other_user_id } = request.params;
        const { userID } = request.session;

        db.acceptFriendRequest(other_user_id, userID)
            .then((other_user_id) => {
                response.json({
                    success: true,
                    status: REQUEST_ACCEPTED,
                });
            })
            .catch((error) => {
                response.status(500).json({
                    success: false,
                    error: error,
                });
            });
    }
);

//Cancel Request
router.post(
    "/api/v1/friend-request/cancel/:other_user_id",
    (request, response) => {
        const { other_user_id } = request.params;
        const { userID } = request.session;

        db.deleteFriendRequest(other_user_id, userID)
            .then((other_user_id) => {
                response.json({
                    success: true,
                    status: REQUEST_ACCEPTED,
                });
            })
            .catch((error) => {
                response.status(500).json({
                    success: false,
                    error: error,
                });
            });
    }
);

//Unfriend Request
router.post(
    "/api/v1/friend-request/unfriend/:other_user_id",
    (request, response) => {
        const { other_user_id } = request.params;
        const { userID } = request.session;

        db.deleteFriendRequest(other_user_id, userID)
            .then((other_user_id) => {
                response.json({
                    success: true,
                    status: NO_REQUEST,
                });
            })
            .catch((error) => {
                response.status(500).json({
                    success: false,
                    error: error,
                });
            });
    }
);

//Redux
router.get("/api/v1/friends_and_wannabes", (request, response) => {
    db.getFriendsAndWannabes(request.session.userID)
        .then((friends) => {
            response.json({ success: true, friends });
        })

        .catch((error) => {
            response.status(500).json({
                success: false,
                error: error,
            });
        });
});

//show all users
router.get("/api/v1/all-users", (request, response) => {
    db.getAllUsers(request.session.userID)
        .then((users) => {
            response.json({ success: true, users });
        })
        .catch((error) => {
            response.status(500).json({
                success: false,
                error: error,
            });
        });
});

module.exports = router;
