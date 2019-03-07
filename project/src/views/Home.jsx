import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LandingMessage from '../components/LandingMessage/LandingMessage'

class Home extends Component{
    render(){
        return(
            <main>
                <div className="welcome-wrapper" >
                    <LandingMessage message="Music for everyone!">
                        <p>
                            <Link to='/store'>Go to our Store</Link>
                            <Link to='/orders'>View your orders</Link>
                        </p>
                    
                    </LandingMessage>
                
                
                </div>
            </main>
        );
    }
}
export default Home;