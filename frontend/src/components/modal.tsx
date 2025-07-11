import { useEffect, useRef } from "react";

interface ModalProps {
    //Una variable booleana que representa si el modal debe estar abierto o cerrado
    isOpen: boolean,
    //Una función opcional en caso de que requieras hacer algo cuando el Modal se cierre
    onClose: () => void,
    //El resto de los props son para determinar qué mostrar en el modal
    title: string,
    message: string,
    isError: boolean
}

function Modal({ isOpen, onClose, title, message, isError = false }: ModalProps) {

    /*
    El hook "useRef" pertmite referenciar un valor cualquiera, en este caso, una etiqueta HTML

    Esto es necesario para poder acceder a los métodos ".showModal()" y ".close()" más adelante
    */
    const dialogRef = useRef<HTMLDialogElement>(null);

    /*
    Este hook accede a la referencia anterior, y utiliza los métodos correspondientes para abrir
    y cerrar, cuando el padre desde el cual se llama este modal cambia el estado del Prop "isOpen"
    */
    useEffect(() => {
        const dialogNode = dialogRef.current;
        if (dialogNode) {
            if (isOpen) {
                // showModal() abre el diálogo y añade un backdrop oscuro
                dialogNode.showModal();
            } else {
                // close() lo cierra
                dialogNode.close();
            }
        }
    }, [isOpen]);

    const borderColor = isError ? 'border-red-500' : 'border-blue-300';
    const titleColor = isError ? 'text-red-700' : 'text-blue-400';

    return (
        <dialog ref={dialogRef} className={`m-auto p-6 rounded-lg shadow-xl border-t-4 ${borderColor} bg-white w-full max-w-sm`}>
            {
                /*La línea de ref={dialogRef} vincula esta etiqueta a la variable declarada anteriormente. A partir de esto
                cada vez que usemos "dialogRef.current", accederemos específicamente a esta etiqueta    
                */
            }
            <h3 className={`text-2xl font-bold mb-2 ${titleColor}`}>{title}</h3>
            <p className="text-gray-700 mb-6">{message}</p>
            <form method="dialog" className="flex justify-center">
                {/* Un botón dentro de un form con method="dialog" cierra el diálogo por defecto */}
                <button
                    className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </form>
        </dialog>
    );
}

export default Modal;