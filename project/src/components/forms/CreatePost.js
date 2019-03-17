import React, { Component } from 'react';

import fetcher from '../../fetchFunctions';
import { toast } from 'react-toastify';
import createPostValidator from '../validators/CreatePostValidator';


const categoryAll_endpoint = 'categories/all';
const postCreate_endpoint = 'post/create';

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
        fetcher.get(categoryAll_endpoint, data => {
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
        if (!createPostValidator(this.state.title 
            , this.state.description, this.state.image)) {
            return
          }
       
        let body = {
            title:  this.state.title,            
            category:  this.state.category === '' ? this.state.categories[0]._id : this.state.category,
            description:  this.state.description,
            image:  this.state.image,
        };
        

        fetcher.post(postCreate_endpoint, body, res => {
            if(res.error) {
                toast.error(res.error);
            }

            toast.success(res.message);
            this.props.history.push('/');
        })
    }
    

    render() {
        return (
            <div className="createPost"> 
                        <h1>Create free ad</h1>
                        <p >Please fill all fields to create new free ad!</p>               
                    <form  onSubmit={this.handleSubmit}>                        
                        <div >
                            <label htmlFor="title"><b>Title</b></label>
                            <br/>
                            <input type="text" onChange={this.handleChange}  placeholder="Title" name="title" id="title" value={this.state.title} required />
                        </div>
                        <div id="selectForm">
                            <label htmlFor="category"><b>Category</b></label>
                            <br/>
                            <select  onChange={this.handleChange} name="category" id="category" value={this.state.category}>
                                {this.state.categories.map((cat, index) => <option value={cat._id} key={index + 1} >{cat.title}</option>)}
                            </select> 
                        </div>
                        <div >
                            <label htmlFor="image"><b>Image URL</b></label>
                            <br/>
                            <input type="text" onChange={this.handleChange}  name="image" id="image" required placeholder="Image Url"/>
                        </div>
                        <div >
                            <label htmlFor="description"><b>Description</b></label>
                            <textarea onChange={this.handleChange} rows="4" cols="20" minLength="20" className="form-control" placeholder="Description" name="description" id="description" required />
                        </div>
                        <br/>
                        <input type="submit"  value="Create" />
                    </form>
                </div>
            
        )
    }
}