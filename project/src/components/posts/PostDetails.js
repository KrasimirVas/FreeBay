import React, { Component } from 'react';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'

export default class PostDetails extends Component {

    render () {
        return (
            <div>
                <div className="card">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="preview-pic tab-content">
                                <div className="tab-pane active">
                                    <img className="card-img-top" src={this.props.image}
                                        alt="product" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="text-center">
                                <div className="card-title text-uppercase">
                                    <h2>{this.props.title}</h2>
                                </div>
                                <hr />
                                <div className="text-center">
                                    <div className="card-title">
                                        <h2>Description</h2>
                                    </div>
                                    <p>{this.props.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}