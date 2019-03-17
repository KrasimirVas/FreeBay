import React, { Component } from 'react';
import { toast } from 'react-toastify';
import fetcher from '../../fetchFunctions';

import PostTableElement from '../posts/PostTableElement';
import SubMenu from '../common/SubMenu';

const myPost_endpoint = 'posts/myposts';
const postChangeStatus_endpoint = 'post/changestatus';

export default class MyPosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }

        this.changeStatus = this.changeStatus.bind(this);
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts() {
        fetcher.get(myPost_endpoint, res => {
            if (res.err) {
                toast.error(res.err);
                return;
            }

            this.setState({
                posts: res.posts
            });
        })
    }
    
    changeStatus (id) {
        let body = {
            postId: id
        };

        fetcher.post(postChangeStatus_endpoint, body, res => {
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
                                <th>Image</th>
                                <th>Title</th>
                                <th>Description</th>                                
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.posts.map((post, index) => <PostTableElement {...post} key={index + 1} changeStatus={this.changeStatus}/>)}
                        </tbody>
                        </table>
                    </div>
            </div>
        )
    }
}