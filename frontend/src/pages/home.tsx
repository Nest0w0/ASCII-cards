import { useEffect, useState } from "react";
import SideBar from "../components/expantion_sidebar";
import NavBar from "../components/navbar";
import CardList from "../components/card_list";

function Home() {
    const [cards, setCards] = useState([]);
    const [selectedExpantionID, setSelectedExpantionID] = useState<number>(0);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {

        if (selectedExpantionID == 0) {
            fetch(
                'http://localhost:3000/card',
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
                .then((data) => data.json())
                .then((data) => setCards(data));

            return;
        }

        fetch(
            `http://localhost:3000/card/expantion/${selectedExpantionID}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then((data) => data.json())
            .then((data) => setCards(data));


    }, [selectedExpantionID]);

    const handleSelectedExpantion = (expantionID: number) => {
        setSelectedExpantionID(expantionID);
    }

    return (

        <section className="w-full h-full">
            <NavBar title="Lista de Cartas"></NavBar>

            <div className="flex">
                <SideBar onExpantionSelect={handleSelectedExpantion} expantionID={selectedExpantionID}>

                </SideBar>

                <CardList cardsList={cards}>

                </CardList>
            </div>


        </section>



    );
}

export default Home;