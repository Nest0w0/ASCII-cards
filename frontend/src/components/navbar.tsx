import { useNavigate } from "react-router-dom";

interface NavBarProps{
    title: string;
}

function NavBar({title}: NavBarProps){
    const navigate = useNavigate();
    
    return (
            <nav id= 'navbar' className="flex flex-row bg-gray-100 w-full h-15 items-center content-center justify-between">
                <button
                className="bg-blue-400 border-2 border-blue-300 w-1/12 h-10 rounded-lg mx-5 focus:bg-blue-400 focus:border-yellow-400"
                onClick={()=>navigate(-1)}
                >
                    Exit
                </button>
                
                <a className="flex flex-1 font-bold text-lg justify-center">
                    {title}
                </a>
        </nav>
    );
}

export default NavBar;