import React from "react";
import ReactDOM from "react-dom";

import Welcome from "./Welcome.js";
import App from "./App.js";

const userIsLogedIn = location.pathname == "/";

let primaryComponent = <Welcome />;
if (userIsLogedIn) {
    primaryComponent = <App />;
}

ReactDOM.render(primaryComponent, document.getElementById("root"));
