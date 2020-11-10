import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './director-view.scss';


export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }



  render() {
    const { director, movie } = this.props;

    if (!director) return <div className='main-view' />;

    return (
      <div className='director-view'>
        <Card style={{ width: '45 rem' }} className='director-card'>
          <Card.Body>
            <Card.Title className='dir-name'>{director.Name}</Card.Title>
            <Card.Text className='dir-born'>Born: {director.Birth}</Card.Text>
            <Card.Text className='dir-died'>Died: {director.Death}</Card.Text>
            <Card.Text className='dir-bio'>Bio: {director.Bio}</Card.Text>
          </Card.Body>
          <Link to={'/'}>
            {/* <Link to={`/movies/${movie._id}`}> */}
            <Button variant='link' className='dirview-home-button' style={{ background: '#690f38' }}>Home</Button>
          </Link>
        </Card>
      </div>
    )
  }
}

DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string
  })
}


