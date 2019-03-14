import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class AdminCategoryTableElement extends Component {
    render () {
        return (
        <tr>
            <td>{this.props.index}</td>
            <td>{this.props.title}</td>
            <td>{this.props.posts.length}</td>
            <td>
                <Link to={`/category/edit/${this.props._id}`} className="btn btn-sm btn-warning" href="">Edit</Link> 
            </td>
        </tr>
    )}
}