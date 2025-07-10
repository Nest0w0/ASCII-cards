import { useEffect, useRef } from "react";

interface ModalProps{
    isOpen: boolean,
    onClose: () => void,
    title: string,
    message: string,
    isError: boolean
}

function Modal({isOpen, onClose, title, message, isError = false}: ModalProps){

    const dialogRef = useRef<HTMLDialogElement>(null);

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

    useEffect(() => {
        const dialogNode = dialogRef.current;
        if (dialogNode) {
            dialogNode.addEventListener('close', onClose);
        return () => {
            dialogNode.removeEventListener('close', onClose);
        };
        }
  }, [onClose]);

   const borderColor = isError ? 'border-red-500' : 'border-green-500';
    const titleColor = isError ? 'text-red-700' : 'text-green-700';

    return (
        <div className="flex m-auto">
            <dialog ref={dialogRef} className={`p-6 rounded-lg shadow-xl border-t-4 ${borderColor} bg-white w-full max-w-sm`}>
                <h3 className={`text-2xl font-bold mb-2 ${titleColor}`}>{title}</h3>
                <p className="text-gray-700 mb-6">{message}</p>
                <form method="dialog" className="flex justify-center">
                    {/* Un botón dentro de un form con method="dialog" cierra el diálogo por defecto */}
                    <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={onClose}
                    >
                    Cerrar
                    </button>
                </form>
            </dialog>
        </div>
  );
}

export default Modal;