import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./modal";

interface ExpantionButtonProps {
    onExpantionSelect: (expantionId: number) => void,
    expantionID: number,
    expantion: {
        'id': number,
        'name': string,
        'icon': string
    }
}

function ExpantionButton({ onExpantionSelect, expantionID, expantion }: ExpantionButtonProps) {
    const navigate = useNavigate();

    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        message: '',
        isError: false
    });

    const Submit = async () => {

        //Acá no necesitamos el "preventDefault", porque no es cuestionario
        const url = 'http://localhost:3000/expantion/' + expantion['id'];

        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch(
                url,
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

            if (!response.ok) {

                const errorData = await response.json().catch(

                    () => ({ message: "No se pudo obtener el mensaje de error" })
                );

                throw new Error(errorData.message);
            }

            const successMessage = 'The expantion has been deleted successfully';

            setModalState({
                isOpen: true,
                title: 'Success',
                message: successMessage,
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
        <>
            <div
                key={expantion['id']}
                className={`${expantionID == expantion['id'] ? 'bg-blue-200 font-bold' : ''} flex items-center w-full justify-between h-30 text-m hover:text-base border-b-2 hover:border-b-3 hover:font-bold hover:bg-blue-100 hover:border-b-blue-300`}
                onClick={() => { onExpantionSelect(expantion['id']) }}
            >
                <div className="ml-1.5 leading-5">
                    
                    <p>╔═══╗</p>
                    <p>║ {expantion['icon']} ║</p>
                    <p>╚═══╝</p>
                </div>
                
                <a className="flex flex-1 justify-center text-lg">{expantion['name']}</a>

                <div className="flex-col w-1/5 mr-2">
                    <button
                        className={`flex flex-col group w-14 leading-5`}
                        onClick={() => navigate('/edit_expantion/' + expantion['id'])}
                    >
                        <p className="text-left -mb-1 group-hover:text-blue-400">
                            ╔     <span className="float-end">╗</span>
                        </p>
                        <p> Edit </p>
                        <p className="text-left -mt-1 group-hover:text-blue-400">
                            ╚     <span className="float-end">╝</span>
                            </p>
                    </button>

                    <button
                        className="flex flex-col w-14 leading-5 group"
                        onClick={() => Submit()}>
                        <p className="text-left -mb-1 group-hover:text-red-400">
                            ╔     <span className="float-end">╗</span>
                        </p>
                        <p> Erase </p>
                        <p className="text-left -mt-1 group-hover:text-red-400">
                            ╚     <span className="float-end">╝</span>
                            </p>
                    </button>
                </div>
            </div>

            <Modal
                isOpen={modalState.isOpen}
                title={modalState.title}
                message={modalState.message}
                isError={modalState.isError}
                onClose={() => { }}
            />
        </>
    );

}
export default ExpantionButton;