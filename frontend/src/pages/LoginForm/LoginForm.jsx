

function LoginForm(props){
    return (
        <div className="rounded-xl bg-zinc-800 p-4 flex flex-col items-center">
            <h1 className="mb-8">Login</h1>
            <form action={import.meta.env.VITE_API_URL+"login"} method="POST"
            className="flex flex-col gap-4">
                <label htmlFor="username">Username:</label>
                <input placeholder="John Doe" type="text" name="username" id="username" size={50} className="p-2 rounded-xl"/>
                <label htmlFor="password">Password:</label>
                <input placeholder="123456" type="text" name="password" id="password" size={50} className="p-2 rounded-xl"/>
                <button type="submit" className="mt-8">Submit</button>
            </form>
        </div>  
        
    )
}

export default LoginForm;