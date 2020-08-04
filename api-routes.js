const express = require('express');
const router = new express.Router();

const db = require('./db.js');
const ses = require('./ses.js');

const passwords = require('./passwords.js');
const cryptoRandomString = require("crypto-random-string");





router.post('/api/v1/register', (request, response) => {
    const { firstname, lastname, email, password } = request.body;
    
    passwords
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
                error: 'All fields must be filled out.'

            });        
        });    
});


///Route for login

router.post('/api/v1/login', (request, response) => {
    //check if fields are filled 
    const { email, password } = request.body;
    console.log ("request.body", request.body);  
    if (!email || !password) {
        return response.redirect('register', {
            error: 'Required field/s are missing',
            email,
            password,

        });
    }
    //compare pasword_hash with DB
    db.getUserByEmail(email)
        .then((result) => {
            console.log ("result", result);  
            const userPasswordHashFromDB = result.password_hash;
            //hashing
            passwords.compare(password, userPasswordHashFromDB).then((isCorrect) => {
                console.log ("isCorrect", isCorrect);  
                if (isCorrect) {
                    request.session.userID = result.id;
                    response.json({ success: true });
                }
    
                // else {
                //     response.status(401).send('Your email or passwort are incorrect.');
    
                // }
            });
        }).catch(error => {
            console.log(error);
        
            response.json({
                success: false,
                error: 'Your email or passwort are incorrect.'

            });
        });
});
    


//Route for reset PW
router.post('/api/v1/password-reset/code', (request, response) => {
    const { email } = request.body;
    const secretCode = cryptoRandomString({ length: 6 });

    db.addPasswordReset(email, secretCode).then((result) => {
        
        if (result) {
        //send email with new PW 
            const emailBody = `Use this code <span>${secretCode}</span> to change your password.`;
            ses.send(email, 'Password reset code', emailBody).then(() => {
           
            //send message 
                response.json({ success: true });
            });
        } else {
            response.json({ success: false, error: 'Something did not worked out!' });

        }
    });
   
});







//Route for set new Password
router.post('/api/v1/password-reset/set-password', (request, response) => {
    
    //get email, code, new password from request body------------------
    const { email, code, password } = request.body;
    
    //check if email belongs to any user-------------------------------        
    db.getCodeByEmail(code, email).then((result) => {
        console.log("code", code);
        console.log ("email", email);  
        

        console.log ("result", result);  
        
    //check if code from db is the same as code from request----            
        if (result) {
          
            //hash the password-----------------------------------------
            db.getUserByEmail(email).then(user => {
                console.log ("use", user);  
                const userId = user.id;   
                passwords.hash(password).then((password_hash) => {
                    console.log ("password_hash", password_hash);  
                    db.updatePassword(userId, password_hash).then((result) => {
                        console.log ("result 2", result);  
                        response.json({ success: true });
                    });
                });
            });    
            
        } else {
            response.json({ success: false, error: 'Code invalid' });
        }
      
    });

});

// router.get('api/vi/me'(request, response) => {
//     const userId
// })

module.exports = router;