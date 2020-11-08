import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
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
      // movies: [],
      user: null
    };
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

  getMovies(token) {
    axios.get('https://myflix2020.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  onLoggedIn(authData) {
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

    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <div className="main-view">
          {/* <Container> */}
          <Navbar collapseOnSelect expand="lg" className="fixed-top navbar-main">
            <Navbar.Brand as={Link} to="/" className="brand-myflix">MyFlix!</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/" className="navbar-link">Home</Nav.Link>
                <Nav.Link as={Link} to="/users/:Username" className="navbar-link">Profile</Nav.Link>
              </Nav>
              <button onClick={this.onLogOut} variant="dark" type="submit" className="button log-out-button"> Log Out</button>
            </Navbar.Collapse>
          </Navbar>
          {/* </Container> */}

          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return <MoviesList movies={movies} />;
          }} />

          <Route exact path="/register" render={() => <RegistrationView />} />

          <Route path="/movies/:movieId" render={({ match }) =>
            <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

          <Route exact path="/genres/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
          }} />

          <Route path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
          }} />

          <Route exact path="/users/:Username" render={() => <ProfileView movies={movies} />} />

          <Route exact path="/users/:Username/update" render={() =>
            <ProfileUpdate movies={movies} />} />

          <Route path="/logout" render={() => <LoginView />} />
        </div>

      </Router >

    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);
