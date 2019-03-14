import React, { Component } from 'react';

import fetcher from '../../fetchFunctions';
import Post from '../posts/Post';
import Categories from '../categories/Categories';


class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: []
        };

    }

    componentDidMount() {
        fetcher.get('all', res => {
            this.setState({
                data: res.posts
            });
        });
    }

    render() {
        return (
            <div className="container">
                
                    <Categories />
                
                <div className="container posts-container">
                    {this.state.data.length > 0
                    ? <div>
                        <h1>All posts</h1>
                        <div className="row">
                            {this.state.data.map((element, index) => <Post {...element} key={index + 1} />)}
                        </div>
                      </div>
                    
                    : <h2>No Posts yet :/</h2>
                    }
                </div>
            </div>
        )
    }
};

export default Home;