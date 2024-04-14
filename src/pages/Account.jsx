import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Form, Button, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import './Account.css';

function Account() {
    const [place, setPlace] = useState(null);
    const [places, setPlaces] = useState([]);
    const [cards, setCards] = useState([]); // State for card elements
    const [showModal, setShowModal] = useState(false); // State to control the modal display
    const navigate = useNavigate();

    const jusanBonuses = {
        "Супер маркеты": 3,
        "АЗС и СТО": 5,       
        "Рестораны Кафе": 2,
        "Аудио-видео. Книжные. Канцелярия": 8  
    }

    const KaspiBonuses = {
        "Супер маркеты": 1,
        "АЗС и СТО": 10,       
        "Рестораны Кафе": 3,
        "Аудио-видео. Книжные. Канцелярия": 5  
    }

    useEffect(() => {
        fetch('https://likely-sher-gatoo.koyeb.app/companies', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            setPlaces(data.map(company => ({
                value: company.id,
                label: company.name,
                cat: company.cat,
                bonus: company.Bonus
            })));
        })
        .catch(error => console.error('Error fetching companies:', error));

        if (!localStorage.getItem('username')) {
            navigate('/login');
        }

        const cardData = localStorage.getItem('selectedCards');
        if (!cardData) {
            alert("Please fill in card information.");
            navigate('/setcard');
        }

    }, [navigate]);

    const handleChooseCard = (event) => {
        event.preventDefault();
        calculateBonuses();
        setShowModal(true); // Show the modal when the form is submitted
    };

    const handleExit = () =>{
        localStorage.setItem('username', null);
        localStorage.setItem('password', null);
        navigate('/welcome')
    }




    const calculateBonuses = () => {
        const selectedCards = JSON.parse(localStorage.getItem('selectedCards'));
        const bonuses = [];
    
        let kaspiBonus =  KaspiBonuses[place.cat];
        let jusanBonus =  jusanBonuses[place.cat];
        let halykBonus = place ? place.bonus : 0;
    
        if (place && place.cat === localStorage.getItem("jusanNumber")) {
            jusanBonus = 15;
        }
    
        if (selectedCards.Kaspi) {
            bonuses.push({ bankName: 'Kaspi', bonus: kaspiBonus });
        }
        if (selectedCards.Jusan) {
            bonuses.push({ bankName: 'Jusan', bonus: jusanBonus   });
        }
        if (selectedCards.Halyk) {
            bonuses.push({ bankName: 'Halyk', bonus: halykBonus });
        }
    
        bonuses.sort((a, b) => b.bonus - a.bonus);
        const cardElements = bonuses.map(card => (
            <div key={card.bankName} id={card.bankName} className="card">
                <p>{card.bonus+".0%"}</p>
            </div>
        ));

        setCards(cardElements);
    };

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">CashBarmak</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/setcard">Manage cards</Nav.Link>
                            <Nav.Link onClick={handleExit}>Exit</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container fluid="md" className="mt-5 fullheight">
                <Row className="mb-4">
                    <h1>Cashback checker</h1>
                    <Form onSubmit={handleChooseCard}>
                        <Form.Group as={Row} className="mb-3" controlId="placeSelect">
                            <Col className='column-form'>
                                <Select 
                                    className='over'
                                    aria-label="Select place"
                                    value={place}
                                    onChange={setPlace}
                                    options={places}
                                    placeholder="Choose a place..."
                                    isClearable
                                />
                                <Button variant="primary" type="submit">Choose Card</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Row>
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Body onClick={() => setShowModal(false)}>
                        <div id="cards">{cards}</div>
                    </Modal.Body>
                </Modal>
                <div className="clouds"></div>
            </Container>
        </>
    );
}

export default Account;
