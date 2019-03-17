import React, { Component } from 'react';

import fetcher from '../../fetchFunctions';
import { toast } from 'react-toastify';

const categoryAll_endpoint = 'categories/all';
const editPost_endpoint = 'post/edit';

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

        fetcher.get(categoryAll_endpoint, data => {
            if (data.error) {
                toast.error(data.error);
                this.props.history.push('/');

                return;
            }

            fetcher.get(editPost_endpoint + `?id=${id}`, res => {
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

        fetcher.post(editPost_endpoint, body, res => {
            if(res.error) {
                toast.error(res.error);
            }

            toast.success(res.message);
            this.props.history.pop();
        })
    }

    render() {
        return (
            <div className="editPost">
                
                    <form onSubmit={this.handleSubmit}>
                        <h1 >Edit Post</h1>
                       
                        <div >
                            <label htmlFor="title"><b>Title</b></label>
                            <br/>
                            <input type="text" onChange={this.handleChange} placeholder="Title" name="title" id="title" value={this.state.title} required />
                        </div>
                        <div id="selectForm" >
                            <label htmlFor="category"><b>Category</b></label>
                            <br/>
                            <select  onChange={this.handleChange} name="category" id="category" value={this.state.category}>
                                {this.state.categories.map((cat, index) => <option value={cat._id} key={index + 1} >{cat.title}</option>)}
                            </select> 
                        </div>
                        <div >
                            <label htmlFor="image"><b>Image URL</b></label>
                            <br/>
                            <input type="text" onChange={this.handleChange}  name="image" id="image" required value={this.state.image}/>
                        </div>
                        <div >
                            <label htmlFor="description"><b>Description</b></label>
                            <br/>
                            <textarea onChange={this.handleChange} rows="6" cols="20" minLength="20"  placeholder="Description" name="description" id="description" required value={this.state.description} />
                        </div>
                        <br/>
                        <input type="submit" id="editBtn" value="Edit" />
                    </form>
                </div>
            


        )
    }
}