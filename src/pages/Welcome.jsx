import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Welcome.css';
import gifImage from './img/coin.gif';

function Welcome() {
    return (
        <div className="containerW text-center">
            <Row className="justify-content-center">
                <Col xs={12} md={8}>
                    <div className='my-auto'>
                    <img src={gifImage} alt="Spinning coin gif" className="coin"/>
                        <h1 className='welH'>Welcome to <span>CashBarmak</span></h1>
                        <p className="lead">
                            We will help you choose the best bank card in your wallet to receive maximum cashback at given shops.
                        </p>
                        <div className="mt-4">
                            <Link to="/login">
                                <Button variant="primary" size="lg">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button variant="success" size="lg">Sign up</Button>
                            </Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Welcome;
