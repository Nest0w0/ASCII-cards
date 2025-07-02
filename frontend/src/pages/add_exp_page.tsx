import NavBar from "../components/navbar";
import ExpantionForm from "../components/expantion_form";

function AddExpantionPage(){
    return(
        <div>
            <NavBar title="Add Expantion"></NavBar>

            <div className="flex h-screen items-center justify-center">
                <ExpantionForm
                title="Add Expantion"
                defaultID={0}
                defaultIcon=""
                defaultName=""
                method="POST"></ExpantionForm>
            </div>
        </div>
    );
}

export default AddExpantionPage;