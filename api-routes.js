const express = require('express');
const router = new express.Router();

const db = require('./db.js');
const ses = require('./ses.js');

const passwords = require('./passwords.js');
const cryptoRandomString = require("crypto-random-string");





router.post('api/v1/register', (request, response) => {
    const { firstname, lastname, email, password } = request.body;
    
    passwords
        .hash(password)
        .then((password_hash) =>
            db.addNewUser(firstname, lastname, email, password_hash)
        
        )
        .then((addNewUser) => {
            request.session.userId = addNewUser.id;

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


//Route for reset PW
router.post('api/v1/password-reset/code', (request, response) => {
    const { email } = request.body;
    const secretCode = cryptoRandomString({ length: 6 });

    db.addPasswordReset(email, secretCode).then((result) => {
        //send email with new PW 
        const emailBody = `Use this code <span>${secretCode}</span> to change your password.`;
        ses.send(email, 'Password reset code', emailBody).then(() => {
           
            //send message 
            response.json({ success: true });
        });
    });
});

//Route for set new PW
router.post('api/v1/password-reset/set-password', (request, response) => {
    
    //get email, code, new password from request body------------------
    const { email, code, password } = request.body;
    db.get

    //check if email belongs to any user-------------------------------
        
    
    db.getEmailCode(code).then((result) => {
        
        
        
        if (result) {

            //check if code from db is the same as code from request----

            //hash the password-----------------------------------------

            db.updatePassword(password_hash);
            
        } else {
            response.json({ success: false, error: 'Code invalid' });
        }
      
    });

});

// router.get('api/vi/me'(request, response) => {
//     const userId
// })

module.exports = router;