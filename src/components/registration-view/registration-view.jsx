import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './registration-view.scss';


export function RegistrationView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [BirthDate, setBirthDate] = useState('');

  // Allows login with random credentials for existing user, no functionality for new users yet
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(Username, Password, Email, BirthDate);

    // Send a request to the server for authentication then call props.onLoggedIn(Username)
    props.onLoggedIn(Username);
  };

  return (
    <div className="registration-view">
      <h3>Register a New MyFix User</h3>

      <Form className="registration-form">
        <Form.Group controlId="formBasicUsername" className="registration-item">
          <Form.Label>Create Username: </Form.Label>
          <Form.Control type="text" value={Username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
          <Form.Text className="text-muted">Must be alphanumberic and have a minimum of 8 characters.</Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="registration-item">
          <Form.Label>Create Password: </Form.Label>
          <Form.Control type="password" value={Password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
          <Form.Text className="text-muted">Must be alphanumberic and have 8-15 characters.</Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicEmail" className="registration-item">
          <Form.Label>Enter Email Address: </Form.Label>
          <Form.Control type="email" placeholder="Email Address" value={Email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicBirthdate" className="registration-item">
          <Form.Label>Enter Date of Birth: </Form.Label>
          <Form.Control type="date" placeholder="YYYY-MM-DD" value={BirthDate} onChange={e => setBirthDate(e.target.value)} />
        </Form.Group>

        <Button type="submit" variant="primary" className="button-registration" onClick={handleRegister}>Submit</Button>
        <Link to={"/"}><Button variant="secondary" className="button-cancel">Cancel</Button></Link>
      </Form>
    </div>
  );
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.instanceOf(Date).isRequired
  })
};