import React, { Component } from 'react';

export default class MessageTableElement extends Component {
    render () {
        let isRead = localStorage.getItem('userId') !== this.props.author._id && !this.props.isRead;
        return (
        <tr className={isRead ? 'table-info' : '' }>
            <td>{this.props.index}</td>
            <td>{this.props.message}</td>
            <td>{this.props.author.username}</td>
            <td>{this.props.recipient.username}</td>
            <td>{this.props.creationDate}</td>
            <td>
                <button onClick={() => this.props.readMessage(this.props._id)} className={isRead ? "btn btn-sm btn-info"  : "btn btn-sm btn-light disabled" } >Mark as read</button> 
            </td>
        </tr>
    )}
}