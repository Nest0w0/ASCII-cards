import NavBar from "../components/navbar";
import CardForm from "../components/card_form";



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

                {
                /*<button className="bg-red-300 w-1/12 h-1/12 rounded-lg mt-20">
                    <a>Create</a>
                </button>*/
                }
            </div>
        </div>
    );
}

export default AddCardPage;