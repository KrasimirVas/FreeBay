import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'


class Header extends Component {
    render() {
        return (
            <header>
                <NavLink exact to="/" className="logo">Music4U</NavLink>
                <div className="header-right">
                    <NavLink exact to="/">Home</NavLink>
                    {this.props.username ?
                        <span>
                            <NavLink exact to="#">Welcome {this.props.username}!</NavLink>
                            
                            {this.props.isAdmin  ?
                                <span>
                                    <NavLink to="/create">Create</NavLink>
                                </span>
                               : 
                               <span>
                                   <NavLink to="/store">Store</NavLink>
                                    <NavLink to="/myAlbums">My Albums</NavLink>
                               </span>
                               }
                            
                            <NavLink  to="/" onClick={this.props.logout} >Logout</NavLink>
                                                      
                            </span> 
                        :
                        <span>
                            <a href="/register">Register</a>
                            <a href="/login">Login</a>
                        </span>}
                </div>
            </header >

        );
    };
}

export default Header;