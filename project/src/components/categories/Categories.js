import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import fetcher from '../../fetchFunctions';
import { toast } from 'react-toastify';

const allCategoryPath = 'categories/all';
export default class Categories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: []
        }
    }
    componentDidMount() {
        fetcher.get(allCategoryPath, res => {
            if (res.error) {
                toast.error(res.error);
                return;
            }

            this.setState({
                categories: res.categories,
            });
        });
    }

    render() {
        return (
            <div className="category-container">
            <h3 className="category-name">Categories</h3>
                <ul className="category-bar">
                    {this.state.categories.map((cat, index) => (
                        <li className="categoryList" key={index + 1}>
                            <Link to={`/posts/category/${cat._id}`}>{cat.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}