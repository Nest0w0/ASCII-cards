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
        <div className="bg-gray-200 w-1/3 h-67">
            <p className="-mt-3">
                ╔════════════════════════════════════════════╗
            </p>
            <p className="mt-3 text-lg font-bold">
                {title}
            </p>
            <p className="mb-5">
                ╚══════════════════╝
            </p>

            <form className="mb-5" onSubmit={Submit}>
                <div className="flex flex-row leading-4 mb-5">
                    <div className="flex-col w-15 group ml-10">
                        <label>
                            Icon:
                        </label>
                        <br></br>
                        <p className="text-left">╔<span className="float-end">╗</span></p>
                        <input
                            type="text" maxLength={1} value={icon}
                            className="w-10 text-center rounded-sm group-hover:bg-blue-100 group-hover:border-b-3 group-hover:-mb-3"
                            onChange={(e) => setIcon(e.target.value)}></input>
                        <p className="text-left">╚ <span className="float-end">╝</span></p>
                    </div>

                    <div className="group flex-1 mx-7">
                        <label
                        >
                            Name:
                        </label>
                        <br></br>
                        <p className="text-left">╔<span className="float-end">╗</span></p>
                        <input
                            type="text" value={name}
                            className="w-50 text-center rounded-sm group-hover:bg-blue-100 group-hover:border-b-3 group-hover:-mb-3"
                            onChange={(e) => setName(e.target.value)}></input>
                        <p className="text-left">╚ <span className="float-end">╝</span></p>
                    </div>
                </div>


                <div className="flex flex-col justify-self-center group leading-5 w-1/6 h-8 mb-10">
                    <p className="text-left group-hover:bg-blue-100">╔<span className="float-end">╗</span></p>
                    <input
                        type="submit" value={"Submit"}
                        className="group-hover:bg-blue-100"
                    />
                    <p className="text-left group-hover:bg-blue-100">╚ <span className="float-end">╝</span></p>
                </div>
                <p>
                    ╚════════════════════════════════════════════╝
                </p>
            </form>

            <Modal
                isOpen={modalState.isOpen}
                title={modalState.title}
                message={modalState.message}
                isError={modalState.isError}
                onClose={() => { navigate('/home') }}
            ></Modal>
        </div>
    );
}

export default ExpantionForm;