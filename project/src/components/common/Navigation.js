import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'

export default class Navigation extends Component {
    render() {
        let isAdmin = localStorage.getItem('isAdmin');
        let isLogged = localStorage.getItem('username');
        let content = '';
        if (isLogged) {
            content = (
                <div className="nav-right">
                    <span id="nav-username">Hello, {isLogged}!</span>
                    {isAdmin === 'true'
                        ? null
                        :
                        <NavLink to='/user/profile' >Profile</NavLink>
                    }
                    {isAdmin === 'true'
                        ?
                        <Link to='/adminPanel' id="linkMenuLogout" >Admin Panel</Link>
                        : null}
                    <Link to='/logout' id="linkMenuLogout">Logout</Link>
                </div>
            )
        } else {
            content = (
                <div className="float-right">
                    <NavLink to='/login' activeClassName="selected">Login</NavLink>
                    <NavLink to='/register' activeClassName="selected">Register</NavLink>
                </div>
            )
        }
        return (
            <div className="navigation">

                <div className="nav-left">
                    <Link to="/" id="site-logo">FreeBay</Link>
                    <NavLink to='/home' activeClassName="selected">Home</NavLink>
                    {isLogged
                        ?
                        <NavLink to='/post/create' activeClassName="selected">Create Post</NavLink>
                        : null}
                    <NavLink to='/posts/all' activeClassName="selected">All Posts</NavLink>
                    {isAdmin === 'true'
                        ?
                        <NavLink to='/category/create' activeClassName="selected">Create Category</NavLink>
                        : null
                    }
                </div>
                {content}
            </div>
        )
    }
}