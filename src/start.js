import React from "react";
import ReactDOM from "react-dom";



import Welcome from "./Welcome.js";
import App from "./App.js";

const userIsNotLogedIn = location.pathname == "/welcome";

let primaryComponent = <App />;
if (userIsNotLogedIn) {
    primaryComponent = <Welcome />;
}

ReactDOM.render(primaryComponent, document.getElementById("root"));
