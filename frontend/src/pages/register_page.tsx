import { useState, type FormEvent } from "react";
import Modal from "../components/modal";
import { useNavigate } from "react-router-dom";
import BigIcon from "../components/big_icon";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        message: '',
        isError: false,
    });

    const navigate = useNavigate();

    const Submit = async (e: FormEvent) => {
        e.preventDefault();

        try {

            const response = await fetch(
                'http://localhost:3000/auth/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        "username": username,
                        "email": email,
                        "password": password
                    })
                }
            );

            if (!response.ok) {
                throw new Error('An error has ocurred');
            }

            setModalState({
                isOpen: true,
                title: 'Your account creation was successfull',
                message: 'You may now log in',
                isError: false
            });
        } catch (error) {

            console.error('Register Error', error);

            setModalState({
                isOpen: true,
                title: 'There was an error creating your account',
                message: '',
                isError: true
            });
        }
    }

    return (
        <>
            <section className='h-full'>
                <div className='flex flex-col m-auto w-1/3 h-full'>
                    <BigIcon />
                    <div className='flex flex-col bg-gray-300 mt-7'>
                        <p className='-mt-3'>╔════════════════════════════════════════════╗</p>
                        <a className='text-lg font-semibold mt-2'>Register</a>
                        <p>╚══════════╝</p>

                        <form className='p-5 space-y-4' onSubmit={Submit}>
                            <label className='text-sm' htmlFor='username'>Username:</label>

                            <div className='w-full leading-5 group'>
                                <p className="text-left group-hover:text-blue-400">╔<span className="float-end">╗</span></p>
                                <input
                                    className='h-10 w-85 p-2 bg-gray-200 border-2 border-blue-200 group-hover:border-blue-300' type='text' placeholder='Your username'
                                    onChange={(e) => setUsername(e.target.value)}
                                >
                                </input><br />
                                <p className="text-left group-hover:text-blue-400">╚ <span className="float-end">╝</span></p>
                            </div>



                            <label className='text-sm' htmlFor='email'>E-mail:</label><br />
                            <div className='w-full leading-5 group'>
                                <p className="text-left group-hover:text-blue-400">╔<span className="float-end">╗</span></p>
                                <input
                                    className='h-10 w-85 p-2 bg-gray-200 border-2 border-blue-200 group-hover:border-blue-300' type='text' placeholder='Your e-mail' id='email' name='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                /><br />
                                <p className="text-left group-hover:text-blue-400">╚ <span className="float-end">╝</span></p>
                            </div>

                            <label className='text-sm' htmlFor='password'> Password:</label><br />
                            <div className='w-full leading-5 group'>
                                <p className="text-left group-hover:text-blue-400">╔<span className="float-end">╗</span></p>
                                <input
                                    className='h-10 w-85 p-2 bg-gray-200 border-2 border-blue-200 group-hover:border-blue-300' type='text' placeholder='••••••••' id='password' name='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                /><br />
                                <p className="text-left group-hover:text-blue-400">╚ <span className="float-end">╝</span></p>
                            </div>

                            <div className="flex flex-col justify-self-center group leading-5 w-1/6 h-8 mb-3">
                                <p className="text-left group-hover:text-blue-400">╔<span className="float-end">╗</span></p>
                                <input
                                    type='Submit' value={"Submit"}
                                    className='group-hover:font-bold'>
                                </input>
                                <p className="text-left group-hover:text-blue-400">╚ <span className="float-end">╝</span></p>
                            </div>
                        </form>
                        <p className='-mb-3'>╚════════════════════════════════════════════╝</p>
                    </div>
                </div>

                <p className='mt-3 mx-auto flex flex-row justify-center items-center h-20 w-1/3'>
                Already have an account?
                <div className='ml-3 flex flex-col group'>
                    <p className='text-left -mb-1 group-hover:text-blue-500'>╔ <span className='float-end'>╗</span></p>
                    <p
                        className='text-lg group-hover:font-bold'
                        onClick={() => navigate('/')}>
                        <span className='group-hover:text-blue-400'>║</span> Log In <span className='group-hover:text-blue-400'>║</span>
                    </p>
                    <p className='text-left -mt-1 group-hover:text-blue-500'>╚<span className='float-end g'>╝</span></p>
                </div>

            </p>
            </section>

            <Modal
                isOpen={modalState.isOpen}
                title={modalState.title}
                message={modalState.message}
                isError={modalState.isError}
                onClose={() => { navigate('/') }}
            />
        </>
    );
}

export default Register;