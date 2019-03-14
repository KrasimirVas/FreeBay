import React, { Component } from 'react';

import fetcher from '../../fetchFunctions';
import { toast } from 'react-toastify';

const categoryAllPath = 'categories/all';
const postCreatePath = 'post/create';

export default class PostCreateForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: '',            
            category: '',
            description: '',
            image: '',
            categories: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {
        fetcher.get(categoryAllPath, data => {
            if (data.error) {
                toast.error(data.error);
                this.props.history.push('/');
                return;
            }

            this.setState({
                categories : data.categories
            });
        })
    }

    handleChange(event) {
        this.setState({ [event.target.name] : event.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        let body = {
            title:  this.state.title,            
            category:  this.state.category === '' ? this.state.categories[0]._id : this.state.category,
            description:  this.state.description,
            image:  this.state.image,
        };

        fetcher.post(postCreatePath, body, res => {
            if(res.error) {
                toast.error(res.error);
            }

            toast.success(res.message);
            this.props.history.push('/');
        })
    }

    render() {
        return (
            <div className="row">
                <div className="offset-4 col-4">
                    <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
                        <h1 className="text-center">Create Post</h1>
                        <p className="text-center">Please fill in this form to create and post an ad.</p>
                        <hr/>
                        <div className="form-group text-left">
                            <label htmlFor="title"><b>Title</b></label>
                            <input type="text" onChange={this.handleChange} className="form-control" placeholder="Title" name="title" id="title" value={this.state.title} required />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="category"><b>Category</b></label>
                            <select className="form-control" onChange={this.handleChange} name="category" id="category" value={this.state.category}>
                                {this.state.categories.map((cat, index) => <option value={cat._id} key={index + 1} >{cat.title}</option>)}
                            </select> 
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="image"><b>Image URL</b></label>
                            <input type="text" onChange={this.handleChange} className="form-control" name="image" id="image" required />
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="description"><b>Description</b></label>
                            <textarea onChange={this.handleChange} rows="6" cols="20" minLength="20" className="form-control" placeholder="Description" name="description" id="description" required />
                        </div>
                        <br/>
                        <input type="submit" className="btn btn-success" value="Create" />
                    </form>
                </div>
            </div>
        )
    }
}