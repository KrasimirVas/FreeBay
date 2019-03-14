import React, { Component } from 'react';
import fetcher from '../../fetchFunctions';
import { toast } from 'react-toastify'

import MessageForm from '../forms/Message';
import PostDetails from '../posts/PostDetails';

const postDetailsPath = 'post/details';
const messagePath = 'messages/create';

export default class PostDetailsPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            post: {},
        }
        
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        let id = this.props.match.params.id;

        fetcher.get(postDetailsPath + `?id=${id}`, res => {
            this.setState({
                post: res.post,
            });  
        });
    }

    sendMessage (body) {
        body.recipient = this.state.post.author;
        fetcher.post(messagePath, body, res => {
            if(res.error) {
                toast.error(res.error);
                return;
            }

            toast.success(res.message);
        })
    }
    
    render() {
        return (
            <div className="container">
                <PostDetails {...this.state.post}/>
                {localStorage.getItem('token') ? <MessageForm sendMessage={this.sendMessage}/> : null}
            </div>
        )
    }
}