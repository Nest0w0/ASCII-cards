import NavBar from "../components/navbar";
import CardForm from "../components/card_form";
import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditCardPage(){
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
    const cardID = useParams();


    useEffect(()=>{
        fetch('http://localhost:3000/card/'+cardID['id'])
        .then((data) => data.json())
        .then((data) => setCard(data));
    }, []);

    return(
        <div>
            <NavBar title="Edit Card Page"></NavBar>

            <div className="flex flex-col h-screen items-center justify-center">
                <CardForm
                defaultExpantionID={card['expantion']['id']}
                defaultName={card['name']}
                defaultMana={card['mana']}
                defaultAttack={card['attack']}
                defaultHealth={card['health']}
                cardID = {card['id']}
                method = 'PATCH'
                ></CardForm>
            </div>
        </div>
    );
}

export default EditCardPage;