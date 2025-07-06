import { useNavigate } from "react-router-dom";

interface ExpantionButtonProps{
    onExpantionSelect: (expantionId: number) => void,
    expantionID: number,
    expantion: {
        'id': number,
        'name': string,
        'icon': string
    }
}

function ExpantionButton({onExpantionSelect ,expantionID, expantion}: ExpantionButtonProps) {
    const navigate = useNavigate();

    return (
        <div
            key={expantion['id']}
            className={`${expantionID == expantion['id'] ? 'bg-blue-300 font-bold' : ''} flex items-center w-full justify-between h-15 text-m hover:text-lg border-b-2 hover:border-b-3 hover:font-bold hover:bg-blue-100 hover:border-b-blue-300`}
            onClick={() => { onExpantionSelect(expantion['id']) }}
        >
            <a className="ml-5">{expantion['icon']}</a>
            <a className="flex flex-1 justify-center">{expantion['name']}</a>

            <div className="flex-col h-full w-1/5">
                <button
                    className={`${expantionID == expantion['id'] ? 'bg-gray-300' : 'bg-blue-300'} h-7 rounded-sm`}
                    onClick={() => navigate('/edit_expantion/' + expantion['id'])}
                >
                    Edit
                </button>

                <button
                    className="bg-red-300 rounded-sm"
                    onClick={() => fetch('http://localhost:3000/expantion/' + expantion['id'],
                        {
                            method: 'DELETE',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: ""
                        }
                    )}>
                    Erase
                </button>
            </div>
        </div>
    );
}

export default ExpantionButton;