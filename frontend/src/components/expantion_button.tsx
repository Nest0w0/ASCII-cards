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
                className={`${expantionID == expantion['id'] ? 'bg-blue-300 font-bold' : ''} flex items-center w-full justify-between h-20 text-m hover:text-base border-b-2 hover:border-b-3 hover:font-bold hover:bg-blue-100 hover:border-b-blue-300`}
                onClick={() => { onExpantionSelect(expantion['id']) }}
            >
                <a className="ml-5">{expantion['icon']}</a>
                <a className="flex flex-1 justify-center">{expantion['name']}</a>

                <div className="flex-col w-1/5">
                    <button
                        className={`${expantionID == expantion['id'] ? 'bg-gray-200 hover:bg-gray-300' : 'bg-blue-200 hover:bg-blue-300'} h-6 w-11 rounded-sm mb-1 `}
                        onClick={() => navigate('/edit_expantion/' + expantion['id'])}
                    >
                        Edit
                    </button>

                    <button
                        className="bg-red-300 hover:bg-red-400 h-6 w-11 rounded-sm mt-1"
                        onClick={() => Submit()}>
                        Erase
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