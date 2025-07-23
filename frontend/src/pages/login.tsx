import { useNavigate } from 'react-router-dom';
import '../index.css'
import { useState, type FormEvent } from 'react';

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
                <h1 className='font-bold text-gray-900 text-2xl mb-10'>ASCII Cards</h1>
                <div className='flex flex-col bg-gray-300 rounded-2xl'>
                    <a className='text-lg font-semibold mt-2'>Login</a>

                    <form className='p-5 space-y-4' onSubmit={Submit}>
                        <label className='left-0 text-sm' htmlFor='username'>E-mail:</label><br />
                        <input onChange={(e) => setEmail(e.target.value)}
                            className='border-2 bg-gray-200 text-gray-900 border-blue-300 w-full rounded-lg h-10 focus:border-yellow-400 focus:border-3' type='text' placeholder='Your e-mail' id='username' name='username' /><br />

                        <label className='text-left text-sm' htmlFor='password'> Password:</label><br />
                        <input onChange={(e) => setPassword(e.target.value)}
                            className='border-3 bg-gray-200 text-gray-900 border-blue-300 w-full rounded-lg h-10 focus:border-yellow-400 focus:border-3' type='text' placeholder='••••••••' id='password' name='password' /><br />

                        <input
                            type='Submit' value={"Submit"}
                            className='bg-blue-400 border-2 border-blue-300 w-1/4 h-10 rounded-lg mx-auto my-5 text-sm focus:bg-blue-500 focus:border-yellow-400'>
                        </input>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;