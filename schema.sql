
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(500) NOT NULL,
    lastname VARCHAR(500) NOT NULL,
    email VARCHAR(500) NOT NULL UNIQUE,
    password_hash VARCHAR(70) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    
);
INSERT INTO users(id, firstname, lastname, email) VALUES (1, 'Ute', 'Papas','ute@papas.de', 'fhdkhfw67rczizrzvberztvge');


DROP TABLE IF EXISTS passwordresets ;
CREATE TABLE passwordresets (
    id SERIAL PRIMARY KEY,
    email VARCHAR(500) NOT NULL,
    code VARCHAR(6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    
);