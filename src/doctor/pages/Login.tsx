import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_API_URL;

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({});
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/doctor/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const token = await response.text();
                localStorage.setItem("doctorAuthLoginToken", token);
                navigate('/doctor/dashboard');
            }
        } catch (error) {
            setError("Login failed" + error);
        }

    };

    useEffect(() => {
        let timeoutId: any = null;

        const validateToken = async () => {
            try {
                const response = await fetch(`${BASE_URL}/patient/auth`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                });
                if (response.ok) {
                    const isValid = await response.text();
                    if (isValid === "true") {
                        navigate('/doctor/dashboard');
                    }
                }
            } catch (error) {
                setError("Invalid token login again: " + error);
            }
        };

        const token = localStorage.getItem("doctorAuthLoginToken");
        if (token) {
            validateToken();
        }
        if (error) {
            timeoutId = setTimeout(() => {
                setError(null);
            }, 1000);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [error, navigate]);

    return (

        <div className='h-screen bg-gradient-to-r from-lime-100 to-cyan-100 '>
            {error && (
                <div className="bg-red-500 text-white py-4 px-6 mx-3 mt-2 rounded-lg" role="alert">
                    <strong className="font-medium">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <div className="isolate hero min-h-screen">
                <div className="h-screen overflow-hidden flex items-center justify-cente" >
                    <form method="post">
                        <div style={{ width: "40rem" }} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                            <div className="-mx-3 md:flex mb-6">
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                        Email
                                    </label>
                                    <input name="email" onChange={handleChange} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </div>
                            </div>

                            <div className="-mx-3 md:flex mb-6">
                                <div className="md:w-full px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                        Password
                                    </label>
                                    <input name="password" onChange={handleChange} type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                    <p className="text-grey-dark text-xs italic">Please use a secure password</p>
                                    <span className='text-black text-xs font-medium'>Don't have an account?  <a href='/doctor/signup' className='underline'> Sign Up </a></span>
                                </div>
                            </div>

                            <div className="md:flex md:items-center">
                                <div className="md:w-1/3 space-x-2">
                                    <Link to="/#">
                                        <button className="shadow bg-red-400 hover:bg-red-600 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="submit">
                                            Back
                                        </button>
                                    </Link>

                                    <button onClick={handleLogin} className="shadow bg-sky-400 hover:bg-sky-600 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="button">
                                        Login
                                    </button>
                                </div>
                                <div className="md:w-2/3"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}