import React, { Component } from 'react';
import { toast } from 'react-toastify';
import fetcher from '../../fetchFunctions';

import Post from '../posts/Post';

const POSTS_BY_CATEGORY_ENDPOINT = 'posts/category';

export default class MyPosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            category: ''
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        fetcher.get(POSTS_BY_CATEGORY_ENDPOINT + `?id=${id}`, res => {
            if (res.err) {
                toast.error(res.err);
                return;
            }

            this.setState({
                category: res.category.title,
                posts: res.category.posts
            });
        });
    }

    render() {
        return (
            <div className="container">
                <h3 className="text-left">Posts in {this.state.category} category:</h3>
                <div className='row'>
                    {this.state.posts.length === 0 
                    ? <h2>No posts found :/</h2>
                    : this.state.posts.map((post, index) => <Post {...post} key={index + 1} />)}
                </div>
            </div>
        )
    }
}