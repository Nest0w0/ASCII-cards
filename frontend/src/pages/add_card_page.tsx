import NavBar from "../components/navbar";
import CardForm from "../components/card_form";
import Modal from "../components/modal";



function AddCardPage(){
    return (
        <div>
            <NavBar title="Add New Card"></NavBar>
        
            <div className="flex flex-col h-screen items-center justify-center">
                <CardForm
                defaultExpantionID={0}
                defaultName=""
                defaultMana={0}
                defaultAttack={0}
                defaultHealth={0}
                cardID={0}
                method = 'POST'
                ></CardForm>
            </div>
        </div>
    );
}

export default AddCardPage;