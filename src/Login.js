import React from "react";
import { Link } from "react-router-dom";
import axios from "./axios.js";

export default class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
            email: "",
            password: "",
        };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    submit() {
        //Ajax Req for send button

        axios
            .post("/api/v1/login", {
                email: this.state.email,
                password: this.state.password,
            })
            .then((response) => {
                if (response.data.success) {
                    location.replace("/"); //location= browser adress
                } else {
                    this.setState({ error: true });
                }
            });
    }

    render() {
        return (
            <div className="center login">
                <h2>Log in </h2>
                {this.state.error && (
                    <div className="error">
                        Unfortunately it did not worked out!
                    </div>
                )}
                <input
                    type="text"
                    name="email"
                    placeholder="YOUR EMAIL"
                    onChange={(event) => this.handleChange(event)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="YOUR PASSWORD"
                    onChange={(event) => this.handleChange(event)}
                />
                <button onClick={(e) => this.submit()}>LOGIN</button>
                Forgot your password?
                <Link to="/password-reset">Reset your password.</Link>
                You wana register ? <Link to="/">Here you can.</Link>
            </div>
        );
    }
}
