import React, { Component } from 'react';
import { toast } from 'react-toastify';
import fetcher from '../../fetchFunctions';

import AdminPostTableElement from '../posts/AdminPostTableElement';
import SubMenu from '../common/SubMenu';

const allPostPath = 'admin/allposts';
const deletePostPath = 'post/delete';
const changeStatusPostPath = 'post/changestatus';

export default class Posts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }

        this.deletePost = this.deletePost.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts() {
        fetcher.get(allPostPath, res => {
            if (res.err) {
                toast.error(res.err);
                return;
            }

            this.setState({
                posts: res.posts
            });
        });
    }

    deletePost (id) {
        let body = {
            postId: id
        };

        fetcher.post(deletePostPath, body, res => {
            if (res.error) {
                toast.error(res.error);
                
                return;
            }

            toast.success(res.message);

            this.fetchPosts();
        });
    }

    changeStatus (id) {
        let body = {
            postId: id
        };

        fetcher.post(changeStatusPostPath, body, res => {
            if (res.error) {
                toast.error(res.error);
                
                return;
            }

            toast.success(res.message);

            this.fetchPosts();
        });
    }
    
    render() {
        return (
            <div className="container">
                <SubMenu />
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>N</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Description</th>                                
                                <th>Author</th>
                                <th>Category</th>
                                <th>Created On</th>
                                <th>Expire Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.posts.map((post, index) => <AdminPostTableElement {...post} key={index + 1} index={index+1} delete={this.deletePost} changeStatus={this.changeStatus}/>)}
                        </tbody>
                        </table>
                    </div>
            </div>
        )
    }
}