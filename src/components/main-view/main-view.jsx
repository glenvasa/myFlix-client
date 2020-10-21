import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// class MainView extends React.Component {
//   constructor() {
//     // Call the superclass constructor
//     // so React can initialize it
//     super();

//     // Initialize the state to an empty object so we can destructure it later
//     this.state = {};
//   }

//   // This overrides the render() method of the superclass
//   // No need to call super() though, as it does nothing by default
//   render() {
//     return (
//       <div className="main-view"></div>
//     );
//   }
// }

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios.get('https://myflix2020.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  setInitial() {
    this.setState({
      selectedMovie: null
    });
  }

  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {this.state.selectedMovie
          ? <MovieView movie={this.state.selectedMovie} onClick={() => this.setInitial()} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
          ))
        }
      </div>
    );
  }
}


