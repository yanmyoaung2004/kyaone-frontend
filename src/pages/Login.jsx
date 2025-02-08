import { useState } from "react";
import { Link, useNavigate } from "react-router";
// import axios from "../helpers/axios";

export default function Login() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [error, setError] = useState(null);
    let navigate = useNavigate();
  

    let login = async (e) => {
        try {
            e.preventDefault();
            setError(null);

            let data = {
                email,
                password
            }

            let res = await axios.post('/api/users/login', data, {
                withCredentials : true
            });
            if(res.status === 200) {
                navigate('/');
            } ;
        } catch(e) {
            setError(e.response.data.error);
        }
    }

    return (
        <div className="mt-10 w-full max-w-lg mx-auto">
            <form onSubmit={login} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-2xl font-bold text-blue-500 text-center">Login Form</h1>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input value={email} onChange={e => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Email" />
                    {!!(error) && <p className="text-red-500 text-xs italic">{error}</p>}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Password
                    </label>
                    <input value={password} onChange={e => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Login
                    </button>
                    <Link to="/sign-up" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-500" href="#">
                        Register here
                    </Link>
                </div>
            </form>
        </div>
    )
}
