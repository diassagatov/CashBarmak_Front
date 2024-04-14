import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Form, Button, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import './Account.css';

function Account() {
    const {id} = useParams();
    const [place, setPlace] = useState(null);
    const [cards, setCards] = useState([]); // State for card elements
    const [showModal, setShowModal] = useState(true); // State to control the modal display
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
        const fetchCompanyData = async () => {
            const url = `https://likely-sher-gatoo.koyeb.app/companies/?id=${id}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setPlace(data);
        };
        fetchCompanyData();
    }, []);

    useEffect(() => {
        const calculateBonuses = () => {
            const selectedCards = JSON.parse(localStorage.getItem('selectedCards') || '{}');
            const bonuses = [];
        
            let kaspiBonus = place ? KaspiBonuses[place.cat] : 0;
            let jusanBonus = place ? jusanBonuses[place.cat] : 0;
            let halykBonus = place ? place.Bonus : 0;
        
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
        calculateBonuses();
    }, [place]);
   
    const handleClose = () =>{
        setShowModal(false);
        navigate('/account')
    }

    return (
        <div>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <div className='qrTitle'>{place ? place.name : 'Loading...'}</div>
                    <Modal.Body onClick={() => handleClose()}>
                        <div id="cards">{cards}</div>
                    </Modal.Body>
            </Modal>
        </div>
    );
}

export default Account;
