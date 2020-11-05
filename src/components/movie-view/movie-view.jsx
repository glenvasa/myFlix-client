import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './movie-view.scss'

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <section className="movie-info">
          <div className="movie-title">
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>
          <div className="movie-genre">
            <span className="label">Genre: </span>
            <span className="value">{movie.Genre.Name}</span>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link" className="genre-button" style={{ background: '#690f38' }}>Genre Info</Button>
            </Link>
          </div>
          <div className="movie-director">
            <span className="label">Director: </span>
            <span className="value">{movie.Director.Name}</span>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link" className="director-button" style={{ background: '#690f38' }}>Director Info</Button>
            </Link>
          </div>
          <Link to={"/"}>
            <Button className="back-button" style={{ background: '#690f38' }} >Go Back</Button>
          </Link>
        </section>
      </div >
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
      ImagePath: PropTypes.string
    }),
  })
}
