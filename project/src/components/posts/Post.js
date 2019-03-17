import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Post extends Component {
    render () {
        return (
            <div className="card-listing">
                <img className="card-img" src={this.props.image} alt="product" />
                <div className="card-bottom">
                    <h4 className="card-title">{this.props.title}</h4>
                    <p className="card-text">{this.props.description.length > 20 ? this.props.description.substring(0, 17) + '...' : this.props.description}</p>
                    <Link to={`/post/details/${this.props._id}`} className="btn btn-outline-primary" id="readMore">Read more</Link>
                </div>
            </div>
        )}
}