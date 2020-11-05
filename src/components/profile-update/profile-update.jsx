import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './profile-update.scss';

export function ProfileUpdate(props) {
  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');
  const [email, updateEmail] = useState('');
  const [birthdate, updateBirthdate] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user');

    axios.put(`https://myflix2020.herokuapp.com/users/${userId}`,
      {
        Username: username,
        Password: password,
        Email: email,
        Birthdate: birthdate
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        const data = res.data;
        localStorage.setItem('user', data.Username);
        alert('Your profile was successfully updated.');
        window.open('/users/:userId', '_self');
      })
      .catch((e) => {
        console.log('error registering user');
        alert('There was an error updateing your profile. Please make sure all fields are completed.');
      });


    return (
      <div className="profile-update">
        <h3>Update Your Profile</h3>

        <Form className="update-form">
          <Form.Group controlId="formBasicUsername" className="update-item">
            <Form.Label>Username: </Form.Label>
            <Form.Control type="text" value={Username} placeholder="Update Username" onChange={e => updateUsername(e.target.value)} />
            <Form.Text className="text-muted">Must be alphanumberic and have a minimum of 8 characters.</Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="update-item">
            <Form.Label>Update Password: </Form.Label>
            <Form.Control type="password" value={Password} placeholder="Update Password" onChange={e => updatePassword(e.target.value)} />
            <Form.Text className="text-muted">Must be alphanumberic and have 8-15 characters.</Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail" className="update-item">
            <Form.Label>Email Address: </Form.Label>
            <Form.Control type="email" placeholder="Update Email" value={Email} onChange={e => updateEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBasicBirthdate" className="update-item">
            <Form.Label>Date of Birth: </Form.Label>
            <Form.Control type="date" placeholder="YYYY-MM-DD" value={Birthdate} onChange={e => updateBirthdate(e.target.value)} />
          </Form.Group>
        </Form>
        <div className="btns-update">
          <Button type="submit" variant="success" className="button-update-profile" onClick={handleUpdate}>Submit</Button>
          <Link to={"/users/:userId"}>
            <Button variant="secondary" className="button-cancel">Cancel</Button>
          </Link>
        </div>
      </div>
    );
  }

  ProfileUpdate.propTypes = {
    user: PropTypes.shape({
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired,
      Birthdate: PropTypes.instanceOf(Date).isRequired
    })
  }
}