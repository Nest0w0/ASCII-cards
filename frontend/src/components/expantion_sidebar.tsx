import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import ExpantionButton from "./expantion_button";

interface SideBarProps{
    onExpantionSelect: (expantionId: number) => void,
    expantionID: number;
}


function SideBar({onExpantionSelect, expantionID}: SideBarProps){
    const [expantions, SetExpantions] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        fetch(
            'http://localhost:3000/expantion',
        {
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
        })
        .then((data) => data.json())
        .then((data) => SetExpantions(data));
    }, []);

    return (
        <div id='sidebar' className="bg-gray-100 w-1/4 h-screen">
            <a className="flex justify-center items-center bg-gray-200 h-10 text-lg font-bold">
                Expantions
                
            </a>
            <div className="overflow-y-scroll ">
                <button
                id = 'All expantions button'
                key = {0}
                className={
                    `${expantionID == 0 ? 'bg-blue-300 font-bold' : ''} flex items-center w-full justify-between h-15 text-m hover:text-lg border-b-2 hover:border-b-3 hover:font-bold hover:bg-blue-100 hover:border-b-blue-300`}
                
                    onClick={() => onExpantionSelect(0)}
                >        
                    <a className="flex flex-1 justify-center">All Expantions</a>
                </button>
                
                {
                    expantions.map(expantion => {
                        return(
                            <ExpantionButton
                            onExpantionSelect={onExpantionSelect}
                            expantionID={expantionID}
                            expantion={expantion}/>
                        );
                    })
                }
            
                <button
                id = 'Add expantion button'
                key = {-99}
                className={
                    `flex items-center w-full justify-center h-20 text-lg group hover:text-lg border-b-2 hover:border-b-3 hover:font-bold hover:bg-blue-100 hover:border-b-blue-300`}
                
                onClick={() => {navigate('/add_expantion')}}
                >        
                    
                    <a className="bg-gray-300 flex justify-center w-1/6 rounded-lg group-hover:bg-blue-300">+</a>
        
                </button>

            </div>
        
    
        </div>
    );

}

export default SideBar;