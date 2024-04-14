import React, { useState } from 'react';
import { Container, Navbar, Nav, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SetCards.css'; // Assuming you store your styles here

function SetCards() {
    const navigate = useNavigate();
    const [selectedCards, setSelectedCards] = useState({
        Kaspi: false,
        Jusan: false,
        Halyk: false
    });
    const [jusanNumber, setJusanNumber] = useState(1);

    const handleCheckboxChange = (card) => {
        setSelectedCards(prevState => ({
            ...prevState,
            [card]: !prevState[card]
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        settingCards();
    };

    const settingCards = () => {
        localStorage.setItem('selectedCards', JSON.stringify(selectedCards));
        if (selectedCards.Jusan) {
            localStorage.setItem('jusanNumber', jusanNumber);
        } else {
            localStorage.removeItem('jusanNumber');
        }
        navigate('/account');
    };

    const handleExit = () =>{
        localStorage.setItem('username', null);
        localStorage.setItem('password', null);
        navigate('/welcome')
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">CashBarmak</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/account">Bonus checker</Nav.Link>
                            <Nav.Link onClick={handleExit}>Exit</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        
            <Form className='formSet' onSubmit={handleSubmit}>
                <div className="card-container">
                    <div 
                        className={`card2 ${selectedCards.Kaspi ? 'selected' : ''}`}
                        onClick={() => handleCheckboxChange('Kaspi')}
                        id='Kaspi'
                    >
                        Kaspi
                    </div>
                    <div 
                        className={`card2 ${selectedCards.Jusan ? 'selected' : ''}`}
                        onClick={() => handleCheckboxChange('Jusan')}
                        id='Jusan'
                    >
                        Jusan
                        
                    </div>
                    {selectedCards.Jusan && (
                    <Form.Control 

                        as="select"
                        value={jusanNumber}
                        onChange={e => setJusanNumber(e.target.value)}
                        className="mt-2 mb-3 jusanSelect"
                    >
                        {["Супер маркеты", "АЗС и СТО", "Рестораны Кафе", "Аудио-видео. Книжные. Канцелярия"].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </Form.Control>
                )}
                    <div 
                        className={`card2 ${selectedCards.Halyk ? 'selected' : ''}`}
                        onClick={() => handleCheckboxChange('Halyk')}
                        id='Halyk'
                    >
                        Halyk
                    </div>
                    <Button variant="primary" type="submit">
                    Set Cards
                    </Button>
                </div>
            </Form>
        </>
    );
}

export default SetCards;
