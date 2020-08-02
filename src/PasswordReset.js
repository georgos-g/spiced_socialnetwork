
import React from 'react';
import {Link} from 'react-router-dom';

import axios from './axios.js';

export default class PasswordReset extends React.Component {
    constructor() {
        super();
        this.state = {
            step: 1,

            email: 'canary.ceiling@spicedling.email',
        };
    }



    submitNewCodeGeneration() {
        axios.post('api/v1/password-reset/code', {
            email: this.state.email
        }).then((response) => {
            this.setState({ step: 2 });
        });
    }

    render() {
        return (
            <div className='reset_password' > 
                <h2>Reset the Password</h2>
            
                {this.state.step == 1 && ( 
                    <h3>
                        First step: Email field 
                        <button onClick={(event) => this.submitNewCodeGeneration()}>
                            Next step:                             
                        </button>

                    </h3>    
                )}
                {this.state.step == 2 && (
                    <h3>
                        Second step: New code and password fields
                        <button onClick={(event) => this.setState({ step: 3 })}>
                            Next step:
                        </button> 
                    </h3>

                )}
                {this.state.step == 3 && <h3>Third step: Success</h3>}
                <Link to='/login'>Go to login</Link>

            </div>
        );
    }
}
