import React, { Component } from 'react';
import fetcher from '../../fetchFunctions';
import { toast } from 'react-toastify';

const categoryEditPath = 'categories/edit';

export default class CategoryEditForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: '',
            id: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {
        let id = this.props.match.params.id;

        fetcher.get(categoryEditPath + `?id=${id}`, res => {
            if (res.error) {
                toast.error(res.error);
                return;
            }

            this.setState({
                title : res.category.title,
                id: res.category._id
            });
        });
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let body = {
            title: this.state.title,
            id: this.state.id
        };

        fetcher.post(categoryEditPath, body, res => {
            if (res.error) {
                toast.error(res.error);
                return;
            }
            
            toast.success(res.message);
            this.setState({
                title : res.category.title,
                id: res.category.id
            });
        });
    }
    render() {
        return (
            <div className="row">
                <div className="offset-4 col-4">
                    <form onSubmit={this.handleSubmit}>
                        <h1 className="text-center">Edit Category</h1>
                        <hr/>
                        <div className="form-group text-left">
                            <label htmlFor="title"><b>Title</b></label>
                            <input type="text" onChange={this.handleChange} className="form-control" placeholder="Title" name="title" id="title" value={this.state.title} required />
                        </div>
                        <br/>
                        <input type="submit" className="btn btn-warning" value="Edit" />
                    </form>
                </div>
            </div>
        )
    }
}