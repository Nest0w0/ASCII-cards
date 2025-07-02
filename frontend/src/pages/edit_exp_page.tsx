import NavBar from "../components/navbar";
import ExpantionForm from "../components/expantion_form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function EditExpantionPage(){
    const [expantion, setExpantion] = useState({'id':0, 'icon': '', 'name': ''});
    const ExpantionID = useParams();

    useEffect(() => {
        fetch('http://localhost:3000/expantion/'+ExpantionID['id'])
        .then((data) => data.json())
        .then((data) => setExpantion(data));
    });

    return(
        <div>
            <NavBar title="Edit Expantion"></NavBar>

            <div className="flex h-screen items-center justify-center">
                <ExpantionForm
                title="Edit Expantion"
                defaultID={Number(ExpantionID['id'])}
                defaultIcon={expantion['icon']}
                defaultName={expantion['name']}
                method="PATCH"
                ></ExpantionForm>
            </div>
        </div>
    );
}

export default EditExpantionPage;