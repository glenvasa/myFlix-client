import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RegistrationView } from '../registration-view/registration-view';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login-view.scss';



export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Allows login with random credentials for existing user, no functionality for new users yet
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);

    // Send a request to the server for authentication then call props.onLoggedIn(Username)
    props.onLoggedIn(username);
  };

  return (
    <div className="login-view">
      <h2>Welcome to myFlix!</h2>

      <Form className="login-form">
        <Form.Group controlId="formBasicUsername" className="login-item m-auto">
          <Form.Label>Username: </Form.Label>
          <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Username" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="login-item m-auto">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" />
        </Form.Group>

        {/* <Form.Group controlId="formBasicCheckbox" className="login-item m-auto">
          <Form.Check type="checkbox" label="Check if you are ready to enter myFlix" />
        </Form.Group> */}
      </Form>
      <div className="login-buttons">
        <Button onClick={handleSubmit} variant="primary" type="submit" className="button-login mx-auto" style={{ width: '200px' }}>Login</Button>
        {/* <Link to={"/register"}> */}
        <Button variant="success" className="button-register ml-1" style={{ width: '200px' }}>Register</Button>
        {/* </Link> */}
      </div>



    </div>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
};