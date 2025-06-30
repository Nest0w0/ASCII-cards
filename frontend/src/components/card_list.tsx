import Card from "./card";
import { useNavigate } from "react-router-dom";

interface CardListProps{
    cardsList: any[]
}


function CardList({cardsList}: CardListProps){
    const navigate = useNavigate();

    return (
    <div id='card-list' className="w-3/4 h-screen pl-10 grid grid-cols-3 pt-6 gap-15 place-items-center justify-self-center overflow-y-scroll">
        {
            cardsList.map(card => {
                return(
                    <button
                    key={card['id']} 
                    onClick={() => navigate("/card/"+card['id'])}
                    >
                        <Card
                        expantion={card['expantion']['icon']} name = {card['name']}
                        attack={card['attack']} health={card['health']}
                        mana={card['mana']}></Card>
                    </button>
                )
            })
        }
        <button
        className="bg-gray-300 group hover:bg-blue-300 hover:text-bold flex items-center justify-center w-1/2 h-30 rounded-lg"
        onClick={() => navigate("/add_card")}
        >
            <a className="flex items-center text-2xl group-hover:text-bold">+</a>
        </button>
    </div>
    );
}

export default CardList;