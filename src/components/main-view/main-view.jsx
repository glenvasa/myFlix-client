import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdate } from '../profile-update/profile-update';

import { Button } from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './main-view.scss';


export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      user: null
    };
  }

  getMovies(token) {
    axios.get('https://myflix2020.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, user } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <div className="main-view">
          <Container>
            <Row>
              <Route exact path="/" render={() => {
                if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                return movies.map(m =>
                  <Col key={m._id} className="d-flex justify-content-around">
                    <MovieCard key={m._id} movie={m} />
                    {/* <button onClick={this.onLogOut} variant="dark" type="submit" className="button">Log Out</button> */}
                  </Col>
                )
              }} />
            </Row>
          </Container>

          <Route exact path="/register" render={() => <RegistrationView />} />

          <Route exact path="/movies/:movieId" render={({ match }) =>
            <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

          <Route exact path="/genres/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
          }} />

          <Route path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
          }} />

          <Route exact path="/users/:Username" render={({ match }) => {
            if (!user) return <div className="main-view" />
            return <ProfileView user={user} movies={movies} />
          }} />

          <Route exact path="/users/:Username/update" render={() =>
            <ProfileUpdate movies={movies} />} />

          <Route path="/logout" render={() => <LoginView />} />

        </div>
      </Router>
    );
  }
}


