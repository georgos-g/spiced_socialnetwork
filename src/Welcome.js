import React from "react";
import { HashRouter, Route } from "react-router-dom";

import Register from "./Register.js";
import Login from "./Login.js";
import PasswordReset from "./PasswordReset.js";

export default function Welcome() {
    return (
        <div className="welcome">
            <h1>Welcome Secret Friends </h1>
            <div className='welcome_image'>
                <img src="./static/secret_2.jpg" alt=""/>
            </div>

            {/* React Routing-Bibliothek  */}
            <HashRouter>
                <Route path="/login" component={Login} />
                <Route path="/" exact component={Register} />
                <Route path="/password-reset" component={PasswordReset} />
            </HashRouter>
        </div>
    );
}
