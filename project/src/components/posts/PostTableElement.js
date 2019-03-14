import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class PostTableElement extends Component {
    render () {
        return (
        <tr className={this.props.isActive ? '' : 'bg-secondary'}>
            <td><img className="img-thumbnail table-image" src={this.props.image} alt={this.props.title} /></td>
            <td>{this.props.title}</td>
            <td>{this.props.description}</td>            
            <td>{this.props.category.title}</td>
            <td>
                <Link to ={`/post/edit/${this.props._id}`} className="btn btn-sm btn-warning" href="">Edit</Link>
                <button onClick={() => this.props.changeStatus(this.props._id)} className="btn btn-sm btn-dark" >{this.props.isActive ? "Deactivate" : "Activate"}</button>
            </td>
        </tr>
    )}
}