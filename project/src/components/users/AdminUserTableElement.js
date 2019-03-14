import React, { Component } from 'react';

export default class AdminUserTableElement extends Component {
    render () {
        return (
        <tr>
            <td>{this.props.index}</td>
            <td>{this.props.username}</td>
            <td>{this.props.posts.length}</td>            
            <td>{this.props.roles}</td>
            <td>
                <button 
                className={this.props.isDisabled 
                    ? "btn btn-sm btn-warning" 
                    : "btn btn-sm btn-danger"} 
                onClick={() => this.props.disable(this.props._id)}>
                    {this.props.isDisabled 
                        ? 'Unblock' 
                        : 'Block'}
                </button>
            </td>
        </tr>
    )}
}