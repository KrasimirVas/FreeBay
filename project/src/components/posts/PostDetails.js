import React, { Component } from 'react';



export default class PostDetails extends Component {

    render() {
        return (
            <div className="card-details">
                <div className="card-wrapper">
                    <div className="card-img">
                        <img className="card-img" src={this.props.image} alt="product" />
                    </div>
                    <div className="card-title">
                        <h2>{this.props.title}</h2>
                    </div>
                    <div className="card-description">
                        <h2>Description</h2>
                        <p>{this.props.description}</p>
                    </div>

                </div>

            </div>


        )
    }
}