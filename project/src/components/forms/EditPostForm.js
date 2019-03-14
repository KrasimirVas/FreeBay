import React, { Component } from 'react';

import fetcher from '../../fetchFunctions';
import { toast } from 'react-toastify';

const categoryAllPath = 'categories/all';
const postEditPath = 'post/edit';

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
        let id = this.props.match.params.id;

        fetcher.get(categoryAllPath, data => {
            if (data.error) {
                toast.error(data.error);
                this.props.history.push('/');

                return;
            }

            fetcher.get(postEditPath + `?id=${id}`, res => {
                if (res.error) {
                    toast.error(res.error);

                    return;
                }

                this.setState({
                    categories : data.categories,
                    id: res.post._id,
                    title: res.post.title,                    
                    description: res.post.description,
                    category: res.post.category,
                    image: res.post.image
                });
            })
        })
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let body = {
            id: this.state.id,
            title:  this.state.title,            
            category:  this.state.category,
            description:  this.state.description,
            image:  this.state.image,
        };

        fetcher.post(postEditPath, body, res => {
            if(res.error) {
                toast.error(res.error);
            }

            toast.success(res.message);
            this.props.history.pop();
        })
    }

    render() {
        return (
            <div className="row">
                <div className="offset-4 col-4">
                    <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
                        <h1 className="text-center">Edit Post</h1>
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
                            <input type="text" onChange={this.handleChange} className="form-control" name="image" id="image" required value={this.state.image}/>
                        </div>
                        <div className="form-group text-left">
                            <label htmlFor="description"><b>Description</b></label>
                            <textarea onChange={this.handleChange} rows="6" cols="20" minLength="20" className="form-control" placeholder="Description" name="description" id="description" required value={this.state.description} />
                        </div>
                        <br/>
                        <input type="submit" className="btn btn-warning" value="Edit" />
                    </form>
                </div>
            </div>
        )
    }
}