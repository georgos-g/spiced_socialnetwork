import React from 'react';
import {Link} from 'react-router-dom';

import axios from './axios';


export default class Register extends React.Component{
    constructor() {
        super();
        this.state = {
            error: false,
            email: '',
            password: '',
            firstname: '',
            lastname: '',
        };
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        
    }  

    submit() {//Ajax Req for send button 
        
        axios.post('/api/v1/register', {
            email: this.state.email,
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
        })
            .then(response => {
                if (response.data.success) {
                    location.replace('/');//location= browser adress                    
                } else {
                    this.setState({ error: true });
                }
            
            });

    } 
    render() {
        return (
            <div className='register' >
                <h2> Register{' '}</h2>                           
                
                {this.state.error && (
                    <div className='error'>Unfortunately it did not worked out!</div>
                )}

                <input
                    type = 'text'
                    name='firstname'
                    placeholder='FIRSTNAME'
                    onChange = {(event) => this.handleChange(event)}
                />

                <input
                    type = 'text'
                    name='lastname'
                    placeholder='LASTNAME'
                    onChange = {(event) => this.handleChange(event)}
                />

                <input
                    type = 'text'
                    name='email'
                    placeholder='YOUR EMAIL'
                    onChange = {(event) => this.handleChange(event)}
                />

                <input
                    type = 'password'
                    name='password'
                    placeholder='YOUR PASSWORD'
                    onChange = {(event) => this.handleChange(event)}
                />

                <button onClick={(e) => this.submit()}>REGISTER</button>
                   
                You are allready registert? Go to <Link to= '/login'>the login</Link>.
                
            </div>
        );
    }
}