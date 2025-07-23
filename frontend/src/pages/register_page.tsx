import { useState, type FormEvent } from "react";
import Modal from "../components/modal";
import { useNavigate } from "react-router-dom";

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
                    <h1 className='font-bold text-gray-900 text-2xl mb-10'>ASCII Cards</h1>
                    <div className='flex flex-col bg-gray-300 rounded-2xl'>
                        <a className='text-lg font-semibold mt-2'>Register</a>

                        <form className='p-5 space-y-4' onSubmit={Submit}>
                            <label className='text-sm' htmlFor='username'>Username:</label>
                            <input
                                className='h-10 w-full bg-gray-200 rounded-lg border-2 border-blue-300 focus:border-yellow-400 focus:border-3' type='text' placeholder='Your username'
                                onChange={(e) => setUsername(e.target.value)}
                            >

                            </input><br />

                            <label className='text-sm' htmlFor='email'>E-mail:</label><br />
                            <input
                                className='border-2 bg-gray-200 text-gray-900 border-blue-300 w-full rounded-lg h-10 focus:border-yellow-400 focus:border-3' type='text' placeholder='Your e-mail' id='email' name='email'
                                onChange={(e) => setEmail(e.target.value)}
                            /><br />

                            <label className='text-sm' htmlFor='password'> Password:</label><br />
                            <input
                                className='border-2 bg-gray-200 text-gray-900 border-blue-300 w-full rounded-lg h-10 focus:border-yellow-400 focus:border-3' type='text' placeholder='••••••••' id='password' name='password'
                                onChange={(e) => setPassword(e.target.value)}
                            /><br />

                            <input
                                type='Submit' value={"Submit"} readOnly
                                className='bg-blue-400 border-2 border-blue-300 w-1/4 h-10 rounded-lg mx-auto my-5 text-sm focus:bg-blue-500 focus:border-yellow-400'>
                            </input>
                        </form>
                    </div>
                </div>
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