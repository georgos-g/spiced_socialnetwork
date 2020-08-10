const spicedPG = require("spiced-pg");

let dbUrl =
    process.env.DATABASE_URL ||
    "postgres:georgos:georgos@localhost:5432/socialnetwork";
const db = spicedPG(dbUrl);

exports.addNewUser = (firstname, lastname, email, password_hash) => {
    return db
        .query(
            "INSERT INTO users (firstname, lastname, email, password_hash) VALUES($1, $2, $3, $4) RETURNING *;",
            [firstname, lastname, email, password_hash]
        )
        .then((response) => response.rows[0]);
};

exports.addPasswordReset = (email, code) => {
    return db
        .query(
            "INSERT INTO passwordresets (email, code) VALUES($1, $2) RETURNING *;",
            [email, code]
        )
        .then((response) => response.rows[0]);
};

//Images----------------------

exports.addImage = (profile_picture_url, id) => {
    //console.log("profile_picture_url, id", profile_picture_url, id);
    return db
        .query(
            `UPDATE users SET profile_picture_url=$1 WHERE id=$2 RETURNING *;`,
            [profile_picture_url, id]
        )
        .then((response) => response.rows[0]);
};

exports.getImage = (id, profile_picture_url) => {
    return db
        .query(`SELECT * FROM users WHERE id=$1, profile_picture_url = $2;`, [
            id,
            profile_picture_url,
        ])
        .then((result) => {
            return result.rows[0];
        });
};

exports.updatePassword = (userId, passwordHash) => {
    return db.query(
        `UPDATE users SET password_hash=$1 WHERE id=$2 RETURNING *;`,
        [passwordHash, userId]
    );
};

exports.getEmailCode = (email) => {
    return db
        .query(
            `SELECT * FROM passwordresets 
            WHERE email = $1
            AND  CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
            ORDER BY created_at DESC LIMIT 1;`,
            [email]
        )
        .then((result) => result.rows[0]);
};

exports.getUserByEmail = (email) => {
    return db
        .query("SELECT * FROM users WHERE email = $1;", [email])
        .then((response) => response.rows[0]);
};

exports.getUser = (userId) => {
    //console.log ("userId", userId);  
    return db
        .query("SELECT * FROM users WHERE id = $1;", [userId])

        .then((response) => {
            //console.log ("response", response);  
            return response.rows[0];

        });
};

exports.getCodeByEmail = (code, email) => {
    return db
        .query("SELECT * FROM passwordresets WHERE email = $1 and code = $2;", [
            email,
            code,
        ])
        .then((response) => response.rows[0]);
};

exports.getUserForLogin = (email) => {
    return db
        .query("SELECT * FROM users WHERE email = $1;", [email])
        .then((response) => response.rows[0]);
};

exports.updateBio = (userId, bio) => {
    //console.log("userId, bio", userId, bio);

    return db
        .query(`UPDATE users SET bio=$1 WHERE id=$2 RETURNING *;`, [
            bio,
            userId,
        ])
        .then((response) => response.rows[0]);
};

exports.getUsersList = (userId) => {
    return db
        .query(`SELECT * FROM users WHERE id !=$1  ORDER BY id DESC LIMIT 4;`, [
            userId,
        ])
        .then((response) => response.rows[0]);
};
          
exports.findUsers = (firstname) => {
    return db
        .query(`SELECT * FROM users WHERE firstname ILIKE $1;`, [
            firstname + '%',
        ])
        .then((response) => response.rows);
};
