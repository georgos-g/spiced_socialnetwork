import React from 'react';
import {Link} from 'react-router-dom';

import axios from './axios.js';

export default class Register extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className='login'>
                <h2>Log in </h2>
                Forgot your password? 
                Here you can <Link to="/password-reset">reset your password</Link>. 
                You wana register ? Here <Link to="/">you can</Link>.


            </div>
        );
    }
}