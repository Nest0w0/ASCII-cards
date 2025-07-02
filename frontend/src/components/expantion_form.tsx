import { useEffect, useState } from "react";

interface ExpantionFormProps{
    title: string,
    defaultID: number,
    defaultIcon: string,
    defaultName: string,
    method: string
}


function ExpantionForm({defaultID, defaultIcon, defaultName, title, method}: ExpantionFormProps){
    const [icon, setIcon] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        setIcon(defaultIcon);
        setName(defaultName);
    }, [defaultIcon, defaultName]);


    return(
        <div className="bg-blue-300 w-1/3 rounded-lg">
            <p
            className="mb-5 mt-3 text-lg"
            >
                {title}
            </p>

            <form className="flex flex-row mb-5">
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
                    type="text" value = {name}
                    className="bg-blue-100 w-60 text-center"
                    onChange={(e) => setName(e.target.value)}></input>
                </div>
            </form>

            <button
            className="bg-red-300 w-1/3 h-1/6 rounded-lg mb-3"
            onClick={() => {
                if(method === 'POST'){
                    fetch('http://localhost:3000/expantion',
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({'name': name, 'icon': icon.toUpperCase()})
                    });
                }else{
                    fetch('http://localhost:3000/expantion/'+defaultID,
                        {
                            method: 'PATCH',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({'name': name, 'icon': icon.toUpperCase()})
                        });
                }
                
            }}>
                Submit
            </button>
        </div>
    );
}

export default ExpantionForm;