import React, { Component } from 'react';
import { toast } from 'react-toastify';
import fetcher from '../../fetchFunctions';
import jwt from 'jwt-decode';

const loginAuthPath = 'auth/login';

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
        this.setState({[event.target.name] : event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        fetcher.post(loginAuthPath, this.state, res => {
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
            <div className="row">
                <div className="offset-4 col-4">
                    <form onSubmit={this.handleSubmit}>
                        <h1 className="text-center">Login</h1>
                        <hr/>
                        <div className="form-group text-left">
                            <label htmlFor="username"><b>Username</b></label>
                            <input type="text" onChange={this.handleChange} className="form-control" placeholder="Username" name="username" id="login-username" required />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="password"><b>Password</b></label>
                            <input type="password" onChange={this.handleChange} className="form-control" placeholder="Password" name="password" id="login-password" required />
                        </div>
                        <br/>
                        <input type="submit" className="btn btn-success" value="Login" />
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;