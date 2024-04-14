import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password1, setPassword1] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Basic validation functions
    const validateInputs = () => {
        if (!username.trim() || !name.trim() || !surname.trim() || !password1.trim() || !password.trim()) {
            alert("Please fill in all fields.");
            return false;
        }
        if (password1 !== password) {
            alert('Passwords do not match!');
            return false;
        }
        if (password.length < 8) {
            alert('Password must be at least 8 characters long.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateInputs()) {
            return; // Stop the function if validation fails
        }

        const userData = {
            username: username,
            name: name,
            surname: surname,
            password: password
        };

        try {
            const response = await fetch('https://likely-sher-gatoo.koyeb.app/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                console.log(data);
                alert('Account has been created, now log in');
                navigate('/login');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <Container>
            <Form className='logForm' onSubmit={handleSubmit}>
                <h1 className='loginTitle'>Sign up</h1>
                
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Control
                        type="text"
                        placeholder="Email"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicSurname">
                    <Form.Control
                        type="text"
                        placeholder="Surname"
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword1">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password1}
                        onChange={e => setPassword1(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                        type="password"
                        placeholder="Repeat Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button type="submit">Sign Up</Button>

                <div className='orcreate'>
                    Already have an account?
                    <Link to="/login"> Log in</Link>
                </div>
            </Form>

            <div className="clouds"></div>
        </Container>
    );
}

export default Signup;
