import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Footer from './components/common/Footer';
import AppRouter from './AppRouter';
import Menu from './components/common/Navigation';

class App extends Component {
  render() {
    return (
      <div>
        <Menu />
        <ToastContainer autoClose={1000}/>
        <AppRouter />
        
      </div>
    );
  }
}

export default App;
