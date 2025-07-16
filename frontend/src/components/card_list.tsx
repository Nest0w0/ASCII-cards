import Card from "./card";
import { useNavigate } from "react-router-dom";

interface CardListProps{
    cardsList: any[]
}


function CardList({cardsList}: CardListProps){
    const navigate = useNavigate();

    return (
    <div id='card-list' className="w-3/4 h-screen pl-10 grid grid-cols-3 pt-6 gap-15 place-items-start  overflow-y-scroll">
        {
            cardsList.map(card => {
                return(
                    <button
                    key={card['id']} 
                    onClick={() => navigate("/card/"+card['id'])}
                    className="hover:font-bold hover:bg-blue-100 hover:rounded-lg h-60 p-3"
                    >
                        <Card
                        expantion={card['expantion']['icon']} name = {card['name']}
                        attack={card['attack']} health={card['health']}
                        mana={card['mana']}></Card>
                    </button>
                )
            })
        }
        <div className="h-60 w-1/2">
            <button
            className="flex bg-gray-300 group hover:bg-blue-300 hover:text-bold w-30 h-30 my-15 mx-15 rounded-lg"
            onClick={() => navigate("/add_card")}
            >
                <a className="text-2xl m-auto group-hover:text-bold">+</a>
            </button>
        </div>
        
    </div>
    );
}

export default CardList;