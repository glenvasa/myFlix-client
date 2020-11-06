import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import './profile-view.scss';


export class ProfileView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthdate: null,
      FavoriteMovies: [],
      movies: []
    };
  }

  getUser(token) {
    const userId = localStorage.getItem('user');

    axios.get(`https://myflix2020.herokuapp.com/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        this.setState({
          Username: res.data.Username,
          Pasword: res.data.Password,
          Email: res.data.Email,
          Birthdate: res.data.Birthdate,
          FavoriteMovies: res.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  deleteUser(token) {
    const userId = localStorage.getItem('user');
    if (!confirm('Do you really want to delete your profile?')) return;
    axios.delete(`https://myflix2020.herokuapp.com/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) =>
        console.log(res))
    localStorage.removeItem('token');
    window.open('/', '_self');
  }

  deleteFavoriteMovie(movie) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user');

    axios.delete(`https://myflix2020.herokuapp.com/users/${userId}/Movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        console.log(res);
        this.componentDidMount();
      });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeitem('user');
    window.open('/', '_self');
  }

  render() {
    const { movies } = this.props;
    const userFavoriteMovies = this.state.FavoriteMovies;
    const FavoriteMoviesList = movies.filter((movie) => userFavoriteMovies.includes(movie._id));

    return (
      <Container>
        <h2 className="profile-title">Profile Page of {this.state.Username}</h2>
        <Card style={{ width: '50rem' }} className="profile-view">
          <Card.Body>
            <Card.Text className='profile-text'>Username: {this.state.Username}</Card.Text>
            <Card.Text className='profile-text'>Email: {this.state.Email}</Card.Text>
            <Card.Text className='profile-text'>Birthdate: {this.state.Birthdate}</Card.Text>
            <Link to={'/users/:userId/update'}>
              <Button className='to-update-profile-button'>Update Profile</Button>
            </Link>
            <Button onClick={() => this.deleteUser()} className='to-delete-profile-button'>Delete Profile</Button>
            <Link to={'/'}>
              <Button className='profile-go-back-button'>Go Back</Button>
            </Link>
          </Card.Body>
        </Card>
        <Container>
          <h2 className='favorite-movies-title'>Your Favorite Movies</h2>
          {FavoriteMoviesList.map((movie) => {
            return (
              <Card key={movie._.id} style={{ width: '15rem' }} className="favoite-movies">
                <Card.Img variant='top' src={movie.ImagePath} />
                <Card.Body>
                  <Link to={'/movies/${movie._id}'}>
                    <Button variant='link' className='fav-movie-info'>Movie Info</Button>
                  </Link>
                  <Button variant='link' className='fav-movie-remove' onClick={() => this.deleteFavoriteMovie(movie)}>Remove Movie</Button>
                </Card.Body>
              </Card>
            );
          })}
        </Container>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.instanceOf(Date).isRequired,
    FavoriteMovies: PropTypes.array
  })
}
