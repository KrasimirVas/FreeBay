import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class AdminPostTableElement extends Component {
    render () {
        let dateCreated = new Date(this.props.creationDate);
        let dateInMilesconds = new Date().setDate(dateCreated.getDate() + 15);
        let expireDate = new Date(dateInMilesconds);
        let today = new Date(Date.now());
        
        let isExpired = expireDate.getTime() < today.getTime();
        return (
        <tr className={this.props.isActive ? '' : 'bg-secondary'}>
            <td>{this.props.index}</td>
            <td><img src={this.props.image} alt={this.props.title} className='table-image'/></td>
            <td>{this.props.title}</td>
            <td>{this.props.description}</td>            
            <td>{this.props.author.username}</td>
            <td>{this.props.category.title}</td>
            <td>{dateCreated.toLocaleDateString()}</td>
            {
            isExpired
            ? <td className="bg-warning">{expireDate.toLocaleDateString()}</td> 
            : <td>{expireDate.toLocaleDateString()}</td> 
            }
            <td>
                <Link to={`/post/edit/${this.props._id}`} className="btn btn-sm btn-warning" >Edit</Link> 
                <button onClick={() => this.props.delete(this.props._id)} className="btn btn-sm btn-danger" >Delete</button>
                <button onClick={() => this.props.changeStatus(this.props._id)} className="btn btn-sm btn-dark" >{this.props.isActive ? "Deactivate" : "Activate"}</button>
            </td>
        </tr>
    )}
}