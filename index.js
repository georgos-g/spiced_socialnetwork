const express = require('express');
const compression = require('compression');

const cookieSession = require ('cookie-session');
const csurf = require('csurf');
const apiRoutes = require('./api-routes.js');

//const hashing = require('./passwords.js');
//Socket.io 
//const server etc






const app = express();
app.use('/static', express.static('static'));

app.use(express.json());  

//COOKIE SESSION
app.use (cookieSession({
    secret: "Life is a big enigma",
    maxAge: 1000 * 60 * 60 * 24 * 7 //7 Tage 
})
);

app.use(compression());
app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));//uploads is the static folder


app.use(csurf());
app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());//axios
    next();
});


    
app.use(apiRoutes);


if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}


// user not loged in 
app.get('/welcome', (request, response)=>{
    
    //if userID is loged in  -> redirect to Index
    if (request.session.userID) {
        response.redirect('/'); //logged in
    } else {
        response.sendFile(__dirname + '/index.html'); 
    }
});
    

// LOGIN PAGE 


app.get('*', (request, response)=>{
    if (request.session.userID) {
        response.sendFile(__dirname + '/index.html'); 
    } else {
        response.redirect('/welcome'); 
    }
});







app.listen(8080, function () {
    console.log("I'm listening.");
});

