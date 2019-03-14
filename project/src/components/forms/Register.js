import React, { Component } from 'react';

import fetcher from '../../fetchFunctions';
import { toast } from 'react-toastify';

const authRegisterPath = 'auth/register';

class Register extends Component {
    constructor(props){
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
        this.setState({[event.target.name] : event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.password !== this.state.confirmPassword) {
            return;
        }

        fetcher.post(authRegisterPath, this.state, res => {
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
            <div className="row">
                <div className="offset-4 col-4">
                    <form onSubmit={this.handleSubmit}>
                        <h1 className="text-center">Register</h1>
                        <p className="text-center">Please fill in this form to create an account.</p>
                        <hr/>
                        <div className="form-group text-left">
                            <label htmlFor="username"><b>Username</b></label>
                            <input type="text" onChange={this.handleChange} className="form-control" placeholder="Username" name="username" id="username" value={this.state.username} required />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="password"><b>Password</b></label>
                            <input type="password" onChange={this.handleChange} className="form-control" placeholder="Password" name="password" id="password" required />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="confirm-password"><b>Confirm Password</b></label>
                            <input type="password" onChange={this.handleChange} className="form-control" placeholder="Confirm Password" name="confirmPassword" id="confirm-password" required />
                        </div>
                        <br/>
                        <input type="submit" className="btn btn-warning" value="Register" />
                    </form>
                </div>
            </div>
        )
    }
};

export default Register;