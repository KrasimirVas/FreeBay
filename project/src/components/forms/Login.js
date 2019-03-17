import React, { Component } from 'react';
import { toast } from 'react-toastify';
import fetcher from '../../fetchFunctions';
import jwt from 'jwt-decode';

const login_endpoint = 'auth/login';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        fetcher.post(login_endpoint, this.state, res => {
            if (res.error) {
                toast.error(res.error);
                return;
            }

            var decodetToken = jwt(res.token);

            localStorage.setItem('token', res.token);
            localStorage.setItem('username', decodetToken.username);
            localStorage.setItem('isAdmin', decodetToken.isAdmin);
            localStorage.setItem('userId', decodetToken.userId);

            toast.success(res.message);
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <div className="login">
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type="text" onChange={this.handleChange} name="username" placeholder="Vanko82" id="login-username" required />

                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={this.handleChange} name="password" placeholder="******" id="login-password" required />
                    <input type="submit"  value="Login" />
                </form>
            </div>

        )
    }
}

export default Login;