import { useNavigate } from "react-router-dom";
import Icon from "./icon";

interface NavBarProps {
    title: string;
}

function NavBar({ title }: NavBarProps) {
    const navigate = useNavigate();

    return (
        <nav id='navbar' className="flex flex-row bg-gray-100 w-full h-15 items-center content-center">
            <button
                className="bg-blue-400 border-2 border-blue-300 w-1/12 h-10 rounded-lg mx-5 focus:bg-blue-400 focus:border-yellow-400"
                onClick={() => navigate(-1)}
            >
                Exit
            </button>

            <div className="flex w-55 mx-auto px-3 justify-between">
                <Icon/>
                <a className="font-bold text-lg my-auto">
                    {title}
                </a>
            </div>

        </nav>
    );
}

export default NavBar;