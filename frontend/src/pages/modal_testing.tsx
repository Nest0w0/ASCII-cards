import { useState, useRef } from "react";
import Modal from "../components/modal";

function TestingPage(){
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        message: '',
        isError: false,
    });

    return(
        <>
            <button className="bg-gray-300 h-10 w-1/12"
            onClick={() => setModalState({isOpen: true, title: 'Probando Modal', message: 'Probando... Probando', isError: false})}>
                Show Modal
            </button>

            <Modal
            isOpen={modalState.isOpen}
            onClose={() => {}}
            title={modalState.title}
            message={modalState.message}
            isError={modalState.isError}
            >

            </Modal>
        </>
    );

}

export default TestingPage;