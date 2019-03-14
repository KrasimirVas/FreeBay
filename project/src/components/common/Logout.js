import { Component } from 'react';
import { toast } from 'react-toastify';

export default class Logout extends Component {
    logout = () => {
            toast.info('Logout successfull');
            this.props.history.push('/');
            localStorage.clear();
    }

    render = () => {
        this.logout();
        return '';
    }
}