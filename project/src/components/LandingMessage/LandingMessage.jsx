import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingMessage.css'


const LandingMessage = ({message, children}) => {
    return (
        <div className='welcome'>
            <h1>{message}</h1>
            {children}
        </div>

    );
};

export default LandingMessage;