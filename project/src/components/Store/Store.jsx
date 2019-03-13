import React, { Component } from 'react';
import './Store.css'

class Store extends Component {
  render() {
    return (
      <div className="Store">
         <h1>All movies</h1>
        <ul className="movies">
        {this.props.movies.map(movie => 
            (<li key={movie._id} className="movie">
              <h2>{movie.title}</h2>
              <h3>{movie.storyLine}</h3>
              <img src={movie.poster}/>                    
            </li>)
        )}

        </ul>
      </div>
    );
  }
}
      

export default Store;