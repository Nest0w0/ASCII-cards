import { useNavigate } from 'react-router-dom';
import '../index.css'
import { useState, type FormEvent } from 'react';
import BigIcon from '../components/big_icon';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const Submit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(
                'http://localhost:3000/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        "email": email,
                        "password": password
                    })
                }
            );

            if (!response.ok) {
                throw new Error('Wrong Credentials');
            }

            const data = await response.json();

            localStorage.setItem('accessToken', data.accessToken);

            navigate('/home');
        } catch (error) {
            console.error('Error de login:', error);
        }
    }


    return (
        <section className='h-full'>
            <div className='flex flex-col m-auto w-1/3 h-full'>
                <BigIcon />
                <div className='flex flex-col bg-gray-300 mt-7'>
                    <p className='-mt-3'>╔════════════════════════════════════════════╗</p>
                    <a className='text-lg font-semibold mt-2'>Login</a>
                    <p>╚══════════╝</p>

                    <form className='p-5 space-y-4' onSubmit={Submit}>
                        <label className='left-0 text-sm' htmlFor='username'>E-mail:</label><br />
                        <div className='w-full leading-5 group'>
                            <p className="text-left group-hover:text-blue-400">╔<span className="float-end">╗</span></p>
                            <input onChange={(e) => setEmail(e.target.value)}
                                className='text-gray-900 h-10 w-85 p-2 bg-gray-200  border-2 border-blue-200 group-hover:border-blue-300' type='text' placeholder='Your e-mail' id='username' name='username' /><br />
                            <p className="text-left group-hover:text-blue-400">╚ <span className="float-end">╝</span></p>
                        </div>

                        <label className='text-left text-sm' htmlFor='password'> Password:</label><br />
                        <div className='w-full leading-5 group'>
                            <p className="text-left group-hover:text-blue-400">╔<span className="float-end">╗</span></p>
                            <input onChange={(e) => setPassword(e.target.value)}
                                className='text-gray-900 h-10 w-85 p-2 bg-gray-200 border-2 border-blue-200 group-hover:border-blue-300' type='text' placeholder='••••••••' id='password' name='password' /><br />
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
                Not have an account yet?
                <div className='ml-3 flex flex-col group'>
                    <p className='text-left -mb-1 group-hover:text-blue-500'>╔ <span className='float-end'>╗</span></p>
                    <p
                        className='text-lg group-hover:font-bold'
                        onClick={() => navigate('/register')}>
                        <span className='group-hover:text-blue-400'>║</span> Register <span className='group-hover:text-blue-400'>║</span>
                    </p>
                    <p className='text-left -mt-1 group-hover:text-blue-500'>╚<span className='float-end g'>╝</span></p>
                </div>

            </p>
        </section>
    );
}

export default Login;