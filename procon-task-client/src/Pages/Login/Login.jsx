import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../Components/ErrorMessage';
import Loading from '../../Components/Loading/Loading';

import './Login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
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

    // POST method for loging in User
    const submitHandler = (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            setLoading(true);

            axios.post('http://localhost:8000/users/login', { email, password }, config)
                .then(function (response) {
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                setLoading(false);
            })
                .catch(function (error) {
                    setError("Invalid email or password");
                    setLoading(false);
                });
        } catch (error) {
            setError(error.response);
            setLoading(false);
        }
    }

    return <div>
        <div className='login-form-container'>
            <h1>Log in</h1>
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {loading && <Loading />}
            <Form onSubmit={submitHandler}>

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

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        </div>

    </div>;
}

export default Login;
