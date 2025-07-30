import { useNavigate } from "react-router-dom";
import Icon from "./small_icon";

interface NavBarProps {
    title: string;
}

function NavBar({ title }: NavBarProps) {
    const navigate = useNavigate();

    return (
        <nav id='navbar' className="flex flex-row bg-gray-100 w-full h-15 items-center content-center">
            <button
                className="flex flex-col w-15 ml-3 group"
                onClick={() => navigate(-1)}
            >
                <p className='text-left group-hover:text-blue-500'>╔ <span className='float-end'>╗</span></p>
                <p className='text-4xl font-bold -my-2'>«</p>
                <p className='text-left group-hover:text-blue-500'>╚<span className='float-end g'>╝</span></p>
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