const express = require("express");
const app = express();
const compression = require("compression");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

const db = require("./db.js");
const cookieSession = require("cookie-session");

//COOKIE SESSION Socket.io
const cookieSessionMiddleware = cookieSession({
    secret: "Life is a big enigma",
    maxAge: 1000 * 60 * 60 * 24 * 14,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

const csurf = require("csurf");
const apiRoutes = require("./api-routes.js");

app.use("/static", express.static("static"));

app.use(express.json());

app.use(compression());
app.use("/public", express.static("public")); //public is the upload folder
app.use("/uploads", express.static("uploads")); //uploads is the static folder

//CSRF security
app.use(csurf());
app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(apiRoutes);

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// user not loged in
app.get("/welcome", (request, response) => {
    //if userID is loged in  -> redirect to Index
    if (request.session.userID) {
        response.redirect("/"); //logged in
    } else {
        response.sendFile(__dirname + "/index.html");
    }
});

// LOGIN PAGE

app.get("*", (request, response) => {
    if (request.session.userID) {
        response.sendFile(__dirname + "/index.html");
    } else {
        response.redirect("/welcome");
    }
});

//Socket.io

//connect
io.on(
    "connection",
    async function (socket) {
        //check if user is logged in (cookie session)
        const userId = socket.request.session.userID;
        const user = await db.getUser(userId);

        //disconnect if user is not logged in
        if (!userId) {
            return socket.disconnect(true);
        }
        //read messages

        socket.on("newMessage", (message) => {
            return db
                .addMessage(userId, message)
                .then((rows) => {
                    let newMessage = {
                        ...user,
                        chat_id: rows.id,
                        message_text: rows.message_text,
                        created_at: rows.created_at,
                        user_id: rows.user_id,
                    };

                    io.sockets.emit("chatMessage", newMessage);
                })

                .catch((error) => {
                    console.log("NEWMessageError__: ", error);
                });
        });

        //Zuweisung
        //io.socket.emit('messages', lastMessages);

        let getLastMessages = async () => {
            const rows = await db.getLastMessages();

            let lastMessages = rows;
            io.sockets.emit("chatMessages", lastMessages);
        };

        getLastMessages();
    }

    /* ... */
);

//SERVER
server.listen(8080, function () {
    console.log("I'm listening.");
});
