import React, { Component } from 'react';
import registerValidator from '../validators/RegisterValidator';

import fetcher from '../../fetchFunctions';
import { toast } from 'react-toastify';

const register_endpoint = 'auth/register';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmPassword: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!registerValidator(this.state.username 
            , this.state.password, this.state.confirmPassword)) {
            return false;
            }
        

        fetcher.post(register_endpoint, this.state, res => {
            if (res.error) {
                toast.error(res.error);
                return;
            }

            toast.success(res.message);
            this.props.history.push('/login');
        });
    }

    render() {
        return (
            <div className="register">
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type="text" onChange={this.handleChange} placeholder="Username" name="username" id="username" value={this.state.username} required />

                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={this.handleChange} placeholder="Password" name="password" id="password" required />
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" onChange={this.handleChange} placeholder="Confirm Password" name="confirmPassword" id="confirm-password" required />

                    <input input type="submit" value="Register" />
                </form>
            </div>


        )
    }
};

export default Register;