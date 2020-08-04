
import React from 'react';
import {Link} from 'react-router-dom';

import axios from './axios.js';

export default class PasswordReset extends React.Component { 

    constructor() {//
        super();
        this.state = {
            step: 1,
            email: '',
            newPassword: '',
            secretCode: '',
        };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        
    }

    resetEmailCode() {
        axios.post('/api/v1/password-reset/code', {
            email: this.state.email,
            newPassword: this.state.newPassword,
            secretCode: this.state.secretCode,
            
        }).then((response) => {
            if (response.data.success) {
                this.setState({ step: 2 });
            } 
        });
    }

    setNewPassword() {
        axios.post('/api/v1/password-reset/set-password', {
            password: this.state.password,
            code: this.state.code,
            email: this.state.email,
        }).then((response) => {
            if (response.data.success) {
                this.setState({ step: 3 });
            } 
        });
        
    }

    render() { 



        if (this.state.step === 1) {

            return (
                <div className='reset_password'> 
                    <h3>Reset your code - Enter your email.</h3>
                    <input
                        key="email"
                        id='email'
                        name='email'
                        placeholder='YOUR EMAIL'
                        onChange={(event) => this.handleChange(event)}
                    />
                             
                             
                    <button onClick={(event) => this.resetEmailCode(event)}>
                            Reset Password
                    </button> 
                </div>
    
            );
        }//state.step === 1
        
            
        if (this.state.step == 2) {
            return ( 
                <div className='reset_password'>
                    Enter the code you have recieved and change your password.
                    <br />
                    <input
                        key="secretCode"
                        id='secret-code'
                        name='code'
                        placeholder='CODE'
                        onChange={(event) => this.handleChange(event)}
                    />
                    <br /> 
                    <input
                        key="newPassword"
                        id='new-password'
                        name='password'
                        placeholder='NEW PASSWORD'
                        onChange={(event) => this.handleChange(event)}
                    />
                    <br />     
                    <button onClick={(event) => this.setNewPassword(event)}>
                            Reset Password
                    </button> 
                </div>            
            );
        }
    

        
        if (this.state.step == 3) {
            return (
                <div className='reset_password'>Operation Successful! 
                    <Link to='/login'>Go to login</Link></div>);  
                   
        } 
       
                
            
        
    
    }//Render


}
   