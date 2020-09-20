import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import reducer from "./reducer.js";
import Friends from "./Friends.js";

import Welcome from "./Welcome.js";
import App from "./App.js";

//Socket.io
import { init } from "./Sockets.js";

//REDUX
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

const userIsNotLogedIn = location.pathname == "/welcome";

let primaryComponent = <App />;
if (userIsNotLogedIn) {
    primaryComponent = <Welcome />;
}
init(store);
const ele = (
    <Provider store={store}>
        {primaryComponent}
        {/* <App />  */}
    </Provider>
);

ReactDOM.render(ele, document.getElementById("root"));
