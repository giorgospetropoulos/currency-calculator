import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap'
import ErrorMessage from '../../Components/ErrorMessage';
import { Loading } from '../../Components';
import './Register.css';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    // if user is logged in Redirect to homepage
    if (userInfo) {
      navigate(`/`, { replace: true });
    }
  })

  // POST method for creating new User
  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not Match")
    } else {
      setLoading(true);
      axios.post("http://localhost:8000/users/add", { username, email, password })
        .then(function (response) {
          setLoading(false);
          localStorage.setItem('userInfo', JSON.stringify(response.data));

        })
        .catch(function (error) {
          setError(error);
        });
    }
  }

  return <div>
    <div className='register-form-container'>
      <h1>Register</h1>
      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      {loading && <Loading />}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  </div>;
}

export default Register;
