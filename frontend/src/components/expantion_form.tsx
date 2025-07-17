import { useEffect, useState, type FormEvent } from "react";
import Modal from "./modal";
import { useNavigate } from "react-router-dom";

interface ExpantionFormProps {
    title: string,
    defaultID: number,
    defaultIcon: string,
    defaultName: string,
    method: string
}


function ExpantionForm({ defaultID, defaultIcon, defaultName, title, method }: ExpantionFormProps) {
    const [icon, setIcon] = useState("");
    const [name, setName] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setIcon(defaultIcon);
        setName(defaultName);
    }, [defaultIcon, defaultName]);

    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        message: '',
        isError: false
    });

    const Submit = async (e: FormEvent) => {
        e.preventDefault();

        const url = (method === 'POST' ? 'http://localhost:3000/expantion' : 'http://localhost:3000/expantion/' + defaultID);
        const token = localStorage.getItem('accessToken');


        try {
            const response = await fetch(
                url,
                {
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        'name': name,
                        'icon': icon.toUpperCase()
                    })
                }
            );

            if (!response.ok) {

                const errorData = await response.json().catch(

                    () => ({ message: "No se pudo obtener el mensaje de error" })
                );

                throw new Error(errorData.message);
            }

            const successMessage = (method === 'POST' ? 'The expantion has been created successfully' : 'The expantion has been edited succesfully');

            setModalState({
                isOpen: true,
                title: 'Success',
                message: successMessage,
                isError: false
            });
        }
        catch {
            setModalState({
                isOpen: true,
                title: 'Error',
                message: 'An Error has ocurred',
                isError: true
            });
        }
    }

    return (
        <div className="bg-blue-300 w-1/3 rounded-lg">
            <p className="mb-5 mt-3 text-lg">
                {title}
            </p>

            <form className="mb-5" onSubmit={Submit}>
                <div className="flex flex-row mb-5">
                    <div className="flex-colw-15 ml-10">
                        <label>
                            Icon:
                        </label>
                        <br></br>
                        <input
                            type="text" maxLength={1} value={icon}
                            className="bg-blue-100 w-15 text-center"
                            onChange={(e) => setIcon(e.target.value)}></input>
                    </div>

                    <div className="flex-1">
                        <label
                        >
                            Name:
                        </label>
                        <br></br>
                        <input
                            type="text" value={name}
                            className="bg-blue-100 w-60 text-center"
                            onChange={(e) => setName(e.target.value)}></input>
                    </div>
                </div>


                <input
                    type="submit" value={"Submit"}
                    className="bg-red-300 w-1/6 h-8 hover:bg-red-400 hover:border-yellow-300 hover:border-2 rounded-lg"
                />
            </form>

            <Modal
                isOpen={modalState.isOpen}
                title={modalState.title}
                message={modalState.message}
                isError={modalState.isError}
                onClose={() => {navigate('/home')}}
            ></Modal>
        </div>
    );
}

export default ExpantionForm;