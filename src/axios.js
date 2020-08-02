import axios from 'axios';


const myOnlyAxiosCopy = axios.create({// 
    
    xsrfCookieName: 'mytoken',
    xsrfHeaderName: 'csrf-token' // the csurf middleware automatically checks this header for the token


});

export default myOnlyAxiosCopy;
