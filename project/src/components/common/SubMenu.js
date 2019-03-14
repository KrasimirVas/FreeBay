import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

export default class SubMenu extends Component {
    render() {
        return (
            <div className="second-nav">
                {localStorage.getItem('isAdmin') === 'true' 
                ? <div className="nav-submenu"> 
                    <NavLink activeClassName="selected" to="/admin/users">Users</NavLink>
                    <NavLink activeClassName="selected" to="/admin/posts">Posts</NavLink>
                    <NavLink activeClassName="selected" to="/admin/categories">Categories</NavLink>
                    <NavLink activeClassName="selected" to="/user/mymessages">Messages</NavLink>
                  </div>
                : <div className="nav-submenu">  
                    <NavLink activeClassName="selected" to="/user/myposts">My Posts</NavLink>
                    <NavLink activeClassName="selected" to="/user/mymessages">Messages</NavLink>
                    </div>
                }
            </div>
        )
    }
}