import { useState } from "react";
import { useNavigate } from "react-router-dom";


function LoginForm(props){
    let navigate = useNavigate();
    const [username, setUsername] = useState('username')
    const [password, setPassword] = useState('password')
    const [error, setError] = useState(null)
    async function handleSubmit(e){
        e.preventDefault()
        const data = new URLSearchParams();
        data.append('username', username)
        data.append('password', password)
        const response = await fetch(import.meta.env.VITE_API_URL + "/login", {
            method: "post",
            body: data
        })
        const json = await response.json()
        if(response.ok){
            console.log(json)
            window.localStorage.setItem('token', json.token)
            navigate("/")
        }
        else{
            setError(json.message)
        }
    }

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="rounded-xl bg-zinc-800 p-4 flex flex-col items-center">
                <h1 className="mb-8">Login</h1>
                <form 
                className="flex flex-col gap-4">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" size={50} className="p-2 rounded-xl"
                    value={username}
                    onChange={e => setUsername(e.target.value)}/>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" size={50} className="p-2 rounded-xl"
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
                    <div className="text-red-700">{error}</div>
                    <button type="submit" className="mt-4" onClick={handleSubmit}>Submit</button>
                </form>
            </div>  
        </div>
        
        
    )
}

export default LoginForm;