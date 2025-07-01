import { useEffect, useState } from "react";
        
interface CardFormProps{
    defaultExpantionID: number,
    defaultMana: number,
    defaultName: string,
    defaultAttack: number,
    defaultHealth: number,
    cardID: number,
    method: string
};

function randomshit(expantion: number,setExpantionID: React.Dispatch<React.SetStateAction<number>>, id: number){
    setExpantionID(id);
    console.log(expantion);
}

function CardForm({defaultExpantionID, defaultMana, defaultName, defaultAttack, defaultHealth, cardID, method}: CardFormProps){
    const [expantionID, setExpantionID] = useState(defaultExpantionID);
    const [mana, setMana] = useState(defaultMana);
    const [name, setName] = useState(defaultName);
    const [attack, setAttack] = useState(defaultAttack);
    const [health, setHealth] = useState(defaultHealth);

    const [expantions, setExpantions] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:3000/expantion')
        .then((data) => data.json())
        .then((data) => setExpantions(data));
    },[]);
    
    useEffect(() => {
        setExpantionID(defaultExpantionID);
        setMana(defaultMana);
        setName(defaultName);
        setAttack(defaultAttack);
        setHealth(defaultHealth);
    }, [defaultExpantionID, defaultMana, defaultName, defaultAttack, defaultHealth]);


    return(
        <form id="addCardForm">
                <div className="font-mono w-50 leading-5">
                    <p className="text-left -ml-10">Expantion: <span className="float-end -mr-5">Mana:</span></p>
                    <a className="float-left">
                        ╔═══╦═════════════
                        <span className="-ml-0.5">
                            ╦═══╗
                        </span>
                    </a><br/>
                    <p className="text-left">
                        
                        ║
                        <select
                        id= "expantionIcon"
                        onChange={(e) => setExpantionID(Number(e.target.value))}
                        className="w-8 bg-blue-100 text-center -ml-0.5">
                            {
                                expantions.map(expantion => {
                                    if(expantion['id'] === expantionID){
                                        return(
                                        <option
                                        key={expantion['id']}
                                        selected value={expantion['id']}
                                        onSelect={() => console.log('zksds')}>
                                            {expantion['icon']}
                                        </option>);
                                    }else{
                                        return(
                                        <option
                                        key={expantion['id']}
                                        value={expantion['id']}
                                        onSelect={() => console.log('zksds')}>
                                            {expantion['icon']}
                                        </option>);
                                    }    
                                })
                            }
                        </select>
                        <span className="-ml-1">
                            ║ 
                        </span>
                        <span className="float-end">
                        <span className="mr-0.5">
                            ║
                        </span>
                        <input
                        type="text" id = "mana" maxLength={2} value={mana.toString()}
                        onChange={(e) => setMana(Number(e.target.value))}
                        className="w-6 bg-blue-100 text-center">
                        </input> 
                        ║
                        </span>
                    </p>
                    <p className="text-left">╠═══╝
                        <span className="float-end">╚═══╣</span>
                    </p>
                    <p className="text-left">║
                        <span className="float-end">║</span>
                    </p>
                    <p className="text-left">║
                        <span className="float-end">║</span>
                    </p>
                    <p className="text-left">║
                        <span className="float-end">║</span>
                    </p>
                    <p className="text-left">║
                        <span className="ml-17">Name:</span>
                        <span className="float-end">║</span>
                    </p>
                    <p>
                        <span className="float-left">║</span>
                        <input
                        type="text" id = "mana" maxLength={22} value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-3/4 bg-blue-100 text-center">
                        </input> 
                        <span className="float-end">║</span>
                    </p>
                    <p className="text-left">╠═══╗
                        <span className="float-end">╔═══╣</span>
                    </p>
                    <p className="text-left">
                        ║
                        <input
                        type="text" id = "mana" maxLength={2} value={attack.toString()}
                        onChange={(e) => setAttack(Number(e.target.value))}
                        className="w-6 bg-blue-100 text-center">
                        </input> 
                        <span className="ml-0.5">
                            ║ 
                        </span>
                        <span className="float-end">
                        <span className="mr-0.5">
                            ║ 
                        </span>
                        <input
                        type="text" id = "mana" maxLength={2} value={health}
                        onChange={(e) => setHealth(Number(e.target.value))}
                        className="w-6 bg-blue-100 text-center">
                        </input> 
                        ║
                        </span>
                    </p>
                    <a>╚═══╩═════════════<span className="-ml-0.5">╩═══╝</span></a>
                    <p className="text-left -ml-10">Attack: <span className="float-end -mr-5">Health:</span></p>
                    </div>

                    <input
                    type="submit" value={"Submit"}
                    className="bg-red-300 w-full h-1/12 rounded-lg mt-20"
                    onClick={()=> {
                        if(method === 'POST'){
                            fetch(
                            "http://localhost:3000/card/",
                            {
                                method: "POST",
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    "name": name,
                                    "attack": attack,
                                    "health": health,
                                    "mana": mana,
                                    "expantion": expantionID
                                })
                            });
                        }else{
                            fetch(
                            "http://localhost:3000/card/"+cardID,
                            {
                                method: "PATCH",
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    "name": name,
                                    "attack": attack,
                                    "health": health,
                                    "mana": mana,
                                    "expantion": expantionID
                                })
                            });
                        }


                        
                    }}></input>
            </form>

    );
}

export default CardForm;