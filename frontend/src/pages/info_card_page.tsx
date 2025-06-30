import NavBar from "../components/navbar";
import Card from "../components/card";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function InfoCardPage(){
    const navigate = useNavigate();
    const cardID = useParams();

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
   
    useEffect(()=>{
        fetch('http://localhost:3000/card/'+cardID['id'])
        .then((data) => data.json())
        .then((data) => setCard(data));
    }, []);


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
                expantion= {card['expantion']['icon']}
                name = {card['name']}
                attack = {card['attack']}
                health = {card['health']}
                mana = {card['mana']}
                ></Card>

                <div className="w-1/3">
                    <p className="text-left">
                    Attack Stat: {card['attack']}
                        <span className="float-right">
                            Health Stat: {card['health']}
                        </span>
                    </p>
                </div>


                <button 
                className="bg-red-300 w-30 rounded-lg h-1/12 mt-15 focus:bg-red-400 hover:border-2 hover:border-yellow-200"
                onClick={() => navigate('/edit_card/'+card['id'])}>
                    Change
                </button>
            </div>
        </div>
    );
}

export default InfoCardPage;