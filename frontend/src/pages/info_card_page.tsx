import NavBar from "../components/navbar";
import Card from "../components/card";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, type FormEvent } from "react";
import  Modal  from "../components/modal";

function InfoCardPage() {
    const navigate = useNavigate();
    const cardID = useParams();
    const token = localStorage.getItem('accessToken');

    const [card, setCard] = useState(
        {
            "id": 1,
            "name": "",
            "mana": 0,
            "attack": 0,
            "health": 0,
            "expantion": {
                "id": 0,
                "name": "",
                "icon": "X"
            }
        }
    );

    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        message: '',
        isError: false,
    });

    useEffect(() => {
        fetch(
            'http://localhost:3000/card/' + cardID['id'],
            {
                headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
            }
        )
            .then((data) => data.json())
            .then((data) => setCard(data));
    }, []);

    const Delete = async () => {
        console.log("1");
        try {
            const response = await fetch(
                'http://localhost:3000/card/' + card['id'],
                {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: ''
                }
            );

            if(!response.ok){
                const ErrorData = await response.json().catch(() => ({message: 'Could not receive error message'}));

                throw new Error(ErrorData.message);
            }

            setModalState({
                isOpen: true,
                title: 'Success',
                message: 'The card has been deleted successfully',
                isError: false
            });
        } catch {
            setModalState({
                isOpen: true,
                title: 'Error',
                message: 'An error has ocurred',
                isError: true
            });
        }
    }


    return (
        <div>
            <NavBar title="Card Information"></NavBar>

            <div className="flex flex-col h-screen items-center justify-center">

                <div className="w-1/2">
                    <p className="float-left">
                        This card belongs to: <br></br>
                        Expantion N°{card['expantion']['id']} - {card['expantion']['name']}  ({card['expantion']['icon']})
                        <span className="float-end -mr-50">
                            Mana cost: {card['mana']}
                        </span>
                    </p>
                </div>

                <Card
                    expantion={card['expantion']['icon']}
                    name={card['name']}
                    attack={card['attack']}
                    health={card['health']}
                    mana={card['mana']}
                ></Card>

                <div className="w-1/3">
                    <p className="text-left">
                        Attack Stat: {card['attack']}
                        <span className="float-right">
                            Health Stat: {card['health']}
                        </span>
                    </p>
                </div>

                <div className="flex flex-row w-full justify-center">
                    <button
                        className="bg-blue-300 w-30 h-15 rounded-lg mt-15 mr-15 hover:border-2 hover:border-yellow-200"
                        onClick={() => navigate('/edit_card/' + card['id'])}>
                        Edit
                    </button>

                    <button
                        className="bg-red-300 w-30 rounded-lg mt-15 ml-15 focus:bg-red-400 hover:border-2 hover:border-yellow-200"
                        onClick={() => Delete()}>
                        Erase
                    </button>
                </div>
            </div>

            <Modal
            isOpen = {modalState.isOpen}
            title = {modalState.title}
            message= {modalState.message}
            isError = {modalState.isError}
            onClose= {() => {}}
            />

        </div>
    );
}

export default InfoCardPage;