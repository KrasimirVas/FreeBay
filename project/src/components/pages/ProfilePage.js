import React, { Component } from 'react';
import SubMenu from '../common/SubMenu';

import fetcher from '../../fetchFunctions';
import { toast } from 'react-toastify';

const user_endpoint = 'user'

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            numberOfPosts: ''
        }
    }

    componentDidMount() {
        fetcher.get(user_endpoint, res => {
            if (res.error) {
                toast.error(res.error);
                this.props.history.push('/login');
                return;
            }

            this.setState({
                user: res.user,
                totalPosts: res.user.posts.length,
                activePosts: res.user.posts.filter(p=> p.isActive === true).length
            });
        })
    }
    render() {
        return (
             <div className = "container" >
                <SubMenu />
                <div className='container profile-info'>
                    <h2>Username: {this.state.user.username}</h2>
                    <hr/>
                    <p>Total posts: {this.state.totalPosts}</p>
                    <p>Active posts: {this.state.activePosts}</p>
                    <p>Archived posts: {this.state.totalPosts - this.state.activePosts}</p>
                </div>
            </div>
        )
    }
}