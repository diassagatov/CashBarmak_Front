import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Construct the URL with query parameters
        const queryParams = new URLSearchParams({
            username: username,
            password: password
        }).toString();
        const url = `https://likely-sher-gatoo.koyeb.app/login?${queryParams}`;

        fetch(url)
            .then(response => {
                if (response.ok) { // Check if response is OK
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                console.log('Login Successful:', data);
                // Assuming a non-sensitive token or similar is returned for session handling
                localStorage.setItem('username', username); // Optionally save the username
                localStorage.setItem('name', data.name); // Optionally save the username
                localStorage.setItem('surname', data.surname); // Optionally save the username
                localStorage.setItem('password', password); // Optionally save the username
                navigate('/account'); // Navigate to the account page or dashboard
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Login failed! Please try again later.');
            });
    };

    return (
        <Container>
            <Form className='logForm' onSubmit={handleSubmit}>
                <h1 className='loginTitle'>Login</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Log In
                </Button>
                <div className='orcreate'>
                    or
                    <Link to="/signup"> create an account</Link>
                </div>
            </Form>
            <div className="clouds"></div>
        </Container>
    );
}

export default LoginPage;
