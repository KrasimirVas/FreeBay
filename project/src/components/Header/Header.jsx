import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'


const Header = () => {
    return (
        <header>
            <NavLink exact to="/" className="logo">Music4U</NavLink>
            <div className="header-right">
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/store">Store</NavLink>
                <NavLink to="/orders">My Orders</NavLink>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/logout">Logout</NavLink>
            </div>
        </header>
    );
};

export default Header;