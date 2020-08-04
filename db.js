const spicedPG = require('spiced-pg');

let dbUrl = process.env.DATABASE_URL || 'postgres:georgos:georgos@localhost:5432/socialnetwork';
const db = spicedPG(dbUrl);

exports.addNewUser = (firstname, lastname, email, password_hash) => {
    return db.query(
        'INSERT INTO users (firstname, lastname, email, password_hash) VALUES($1, $2, $3, $4) RETURNING *;',
        [firstname, lastname, email, password_hash]
    ).then(response => response.rows[0]);

};




exports.addPasswordReset = (email, code) => {
    return db.query(
        'INSERT INTO passwordresets (email, code) VALUES($1, $2) RETURNING *;',
        [email, code]
    ).then(response => response.rows[0]);

};


exports.getEmailCode = (email) => {
    return db.query(
        `SELECT * FROM passwordresets 
            WHERE email = $1
            AND  CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
            ORDER BY created_at DESC LIMIT 1;`,
        [email])
        .then(result => result.rows[0]);

};




exports.getUserByEmail = (email) => {
    return db.query
    ('SELECT * FROM users WHERE email = $1;', 
        [email]
    ).then(response => response.rows[0]);
};




exports.getUser = (userId) => {
    return db.query
    ('SELECT * FROM users WHERE email = $1;', 
        [userId]
    ).then(response => response.rows[0]);
};



