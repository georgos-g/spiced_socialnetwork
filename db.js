const spicedPG = require("spiced-pg");

// let dbUrl =
//     process.env.DATABASE_URL ||
//     "postgres:georgos:georgos@localhost:5432/socialnetwork";
// const db = spicedPG(dbUrl);

const db = spicedPG(process.env.DATABASE_URL || 'postgres:georgos:georgos@localhost:5432/socialnetwork')




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

//Images

exports.addImage = (profile_picture_url, id) => {
    return db
        .query(
            `UPDATE users SET profile_picture_url=$1 WHERE id=$2 RETURNING *;`,
            [profile_picture_url, id]
        )
        .then((response) => response.rows[0]);
};

exports.getImage = (id, profile_picture_url) => {
    return db
        .query(
            `SELECT * FROM users WHERE id=$1 AND profile_picture_url = $2;`,
            [id, profile_picture_url]
        )
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
    return db
        .query("SELECT * FROM users WHERE id = $1;", [userId])

        .then((response) => {
            return response.rows[0];
        });
};

exports.getCodeByEmail = (code, email) => {
    return db
        .query("SELECT * FROM passwordresets WHERE email = $1 AND code = $2;", [
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
            firstname + "%",
        ])
        .then((response) => response.rows);
};

//FRIEND BUTTON

//add
exports.addFriendRequest = (from_id, to_id) => {
    //check
    return db
        .query(
            `INSERT INTO friend_requests 
            (from_id, to_id, accepted) 
            VALUES($1, $2, false) RETURNING *;`,
            [from_id, to_id]
        )
        .then((response) => response.rows[0]);
};

//accept
exports.acceptFriendRequest = (from_id, to_id) => {
    return db
        .query(
            `UPDATE friend_requests 
            SET accepted=true 
            WHERE 
            (from_id=$1 AND to_id=$2)
            OR
            (from_id=$2 AND to_id=$1);`,
            [from_id, to_id]
        )
        .then((response) => response.rows[0]);
};

//delete & unfriend
exports.deleteFriendRequest = (from_id, to_id) => {
    return db
        .query(
            `DELETE from friend_requests 
             WHERE 
            (from_id=$1 AND to_id=$2)
            OR
            (from_id=$2 AND to_id=$1);`,
            [from_id, to_id]
        )
        .then((response) => response.rows[0]);
};

//get
exports.getFriendRequest = (userId1, userId2) => {
    return db
        .query(
            `SELECT * FROM friend_requests 
            WHERE 
            (from_id=$1 AND to_id=$2)
            OR 
            (from_id=$2 AND to_id=$1);`,
            [userId1, userId2]
        )
        .then((response) => response.rows[0]);
};

exports.getFriendsAndWannabes = (userId) => {
    return db
        .query(
            `SELECT * FROM friend_requests
            JOIN users
                ON (accepted=false AND from_id=users.id AND to_id=$1)
                OR (accepted=true  AND from_id=users.id AND to_id=$1)
                OR (accepted=true  AND from_id=$1       AND to_id=users.id);`,
            [userId]
        )
        .then((response) => response.rows);
};

//All Users
exports.getAllUsers = (userId) => {
    return db
        .query(
            `SELECT * FROM users 
            WHERE id !=$1  ORDER BY id DESC;`,
            [userId]
        )
        .then((response) => response.rows);
};

//Socket.io Chat
exports.getLastMessages = () => {
    return db
        .query(
            `SELECT * 
        FROM (
            SELECT 
                chat_messages.id AS message_id, *
            FROM
                chat_messages
            JOIN users
                ON(chat_messages.user_id = users.id)
            ORDER BY
                chat_messages.id DESC
            LIMIT 10
         ) as subquery
         ORDER BY message_id ASC;`
        )
        .then((response) => response.rows);
};

exports.addMessage = (user_id, message_text) => {
    return db
        .query(
            `INSERT INTO chat_messages 
        (user_id, message_text) 
        VALUES($1, $2) RETURNING *;`,
            [user_id, message_text]
        )
        .then((response) => response.rows[0]);
};
