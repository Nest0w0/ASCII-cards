import { useEffect, useState, type FormEvent } from "react";
import Modal from "../components/modal";
        
interface CardFormProps{
    defaultExpantionID: number,
    defaultMana: number,
    defaultName: string,
    defaultAttack: number,
    defaultHealth: number,
    cardID: number,
    method: string
};

function CardForm({defaultExpantionID, defaultMana, defaultName, defaultAttack, defaultHealth, cardID, method}: CardFormProps){
    /*
    La primera vez que se renderiza este componente, la consulta a la base de datos no se ha completado, así que al no tener
    los props correctos, se renderiza con valores vacíos o nulos. Es necesario entonces, tener los Props separados de las variables 
    que van a ser utilizadas en el formulario, y actualizarlos con useEffect() una vez la consulta se haya completado
    */
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

    //Esta constante para llevar el estado de los Props del Modal que se encuentra al final
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        message: '',
        isError: false,
    });

    
    const Submit = async (e: FormEvent) => {
        
        /*
        El comportamiento por defecto de un formulario, es que al presionar el botón de tipo "submit", se refresque la página.
        Sin embargo, si eso ocurre, se refresca antes de que el modal de feedback pueda ser mostrado. Así que, necesitamos
        prevenir el refresque cuando ocurra el evento de "submit". Eso hace esta línea de código
        */
        e.preventDefault();

        //Un if terciario para determinar la dirección a la que realizar la petición
        const url = (method === 'POST' ? 'http://localhost:3000/card/': 'http://localhost:3000/card/'+cardID);

        try{
            const response = await fetch(
                url,
                {
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "name": name,
                        "attack": attack,
                        "health": health,
                        "mana": mana,
                        "expantion": expantionID
                    })
                });

                //Si la respuesta no está bien, se obtiene un mensaje de error
                if(!response.ok){

                    const errorData = await response.json().catch(
                        //Si el mensaje de error no está, por problema del servidor, se da uno genérico
                        () => ({message: "No se pudo obtener el mensaje de error"})
                    );

                    throw new Error(errorData.message);
                }

                //Otro if ternario para determinar la descripción del modal
                const successMesssage = method === 'POST' ? 'The card has been created successfully' : 'The card has been edited successfully';

                //Finalmente, se cambia el estado de los Props del Modal. Dado que se está cambiando la propiedad "isOpen" a true,
                //esto activa el efecto que hace que el modal se muestre
                setModalState({
                    isOpen: true,
                    title: 'Success',
                    message: successMesssage,
                    isError:false
                    })
        }catch{
            setModalState({
                isOpen: true,
                title: 'Error',
                message: 'An error has ocurred',
                isError: true
            })
        }
    }

    return(
        <>
        <form id="addCardForm" onSubmit={Submit}>
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
                                            onSelect={() => setExpantionID(expantion['id'])}>
                                                {expantion['icon']}
                                            </option>
                                        );
                                    }else{
                                        return(
                                            <option
                                            key={expantion['id']}
                                            value={expantion['id']}
                                            onSelect={() => setExpantionID(expantion['id'])}>
                                                {expantion['icon']}
                                            </option>
                                        );
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
                    />
        </form>

            <Modal
            isOpen ={modalState.isOpen}
            title = {modalState.title}
            message = {modalState.message}
            isError = {modalState.isError}
            onClose={() => {}}
            >

            </Modal>
        </>                    
    );
}

export default CardForm;