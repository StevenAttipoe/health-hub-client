import React, {useState, useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_API_URL;

export default function DoctorSignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] =  useState({});
    const [error, setError] = useState<string | null>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault();
        try{
            console.log(JSON.stringify(formData))
            const response = await fetch(`${BASE_URL}/doctor/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const token = await response.text();
                localStorage.setItem("doctorAuthSignUpToken", token);
                navigate('/doctor/login');
            }
        } catch(error) {
            setError("Sign up failed: " + error);
        }
    };

    useEffect(() => {
        let timeoutId:any = null;
    
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
      }, [error]);

    return (
        <div>
            {error && (
                <div className="bg-red-500 text-white py-4 px-6 mx-3 mt-2 rounded-lg" role="alert">
                    <strong className="font-medium">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <div className="isolate hero min-h-screen w-screen bg-gradient-to-r from-lime-100 to-cyan-100">
                <div className="overflow-hidden flex items-center justify-center" >
                    <form  method="post" onSubmit={handleSignup}> 
                        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                            <div className="-mx-3 md:flex mb-6">
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                        Fullname
                                    </label>
                                    <input name="fullName" type="text" onChange={handleChange}  placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </div>
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                        Email
                                    </label>
                                    <input name="email" type="text" onChange={handleChange}  placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </div>
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                        Sex
                                    </label>
                                    <input name="gender" type="text" onChange={handleChange}  placeholder="M / F" className="input input-bordered w-full max-w-xs" />
                                </div>
                            </div>

                            <div className="-mx-3 md:flex mb-6">
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                        Phone
                                    </label>
                                    <input name="phoneNumber" type="text" onChange={handleChange}  placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </div>
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                        Speciality
                                    </label>
                                    <input name="speciality" type="text" onChange={handleChange}  placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </div>
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                        Experience In Years
                                    </label>
                                    <input name="experienceInYears" type="text" onChange={handleChange}  placeholder="0-100" className="input input-bordered w-full max-w-xs" />
                                </div>
                            </div>

                            <div className="-mx-3 md:flex">
                                <div className="md:w-full px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                        Password
                                    </label>
                                    <input type="password" name="password" onChange={handleChange}  placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                    <p className="text-grey-dark text-xs italic">Please use a secure password</p>
                                    <span className='text-black text-xs font-medium'>Already have an account?  <a href='/doctor/login' className='underline'> Log In</a></span>
                                </div>
                            </div>
                
                            <br></br>
                            <div className="md:flex md:items-center">
                                <div className="md:w-1/3 space-x-2">
                                <Link to="/#">
                                    <button className="shadow bg-red-400 hover:bg-red-600 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="submit">
                                        Back
                                    </button>
                                </Link>

                                    <button onClick={handleSignup} className="shadow bg-sky-400 hover:bg-sky-600 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="button">
                                        Sign Up
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