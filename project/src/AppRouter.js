import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';


import Home from './components/common/Home';
import Logout from './components/common/Logout';
import NotFound from './components/common/NotFound';

import LoginForm from './components/forms/Login';
import RegisterForm from './components/forms/Register';
import EditPostForm from './components/forms/EditPostForm';
import PostCreateForm from './components/forms/CreatePost';
import CategoryCreateForm from './components/forms/CreateCategoryForm';

import AllPosts from './components/pages/AllPosts';
import PostDetailsPage from './components/pages/PostDetailsPage';
import ProfilePage from './components/pages/ProfilePage';
import MyPosts from './components/pages/MyPosts';
import MyMessages from './components/pages/MyMessages';
import PostsByCategory from './components/pages/PostsByCategory';

import AdminPanel from './components/admin/Panel';
import Users from './components/admin/Users';
import Posts from './components/admin/Posts';
import Categories from './components/admin/Categories';
import CategoryEditForm from './components/forms/EditCategoryForm';

const AppRouter = () => (
    <div>
        <Switch>
            <Route path='/' exact component={Home}/>            
            <Route path='/home' component={() => <Redirect to='/' />} />
            <Route path='/login' component={LoginForm} {...this.props} />
            <Route path='/register' component={RegisterForm} />
            <Route path='/logout' component={Logout} />

            <Route path='/posts/all' component={AllPosts} />
            <Route path='/post/create' component={PostCreateForm} />
            <Route path='/post/details/:id' component={PostDetailsPage} {...this.props} />
            <Route path='/post/edit/:id' component={EditPostForm} {...this.props} />
            <Route path= '/posts/category/:id' component={PostsByCategory} {...this.props}/>

            <Route path='/category/create' component={CategoryCreateForm} />
            <Route path='/category/edit/:id' component={CategoryEditForm} {...this.props} />

            <Route path='/user/profile' component={ProfilePage} {...this.props}/>
            <Route path='/user/myposts' component={MyPosts} {...this.props}/>
            <Route path='/user/mymessages' component={MyMessages} />

            <Route path='/adminpanel' component={AdminPanel} />
            <Route path='/admin/users' component={Users} />
            <Route path='/admin/posts' component={Posts} />
            <Route path='/admin/categories' component={Categories} />
            <Route component={NotFound} />
        </Switch>
    </div>
)

export default AppRouter;