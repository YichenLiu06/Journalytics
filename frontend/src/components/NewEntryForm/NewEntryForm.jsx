function NewEntryForm({title, message, setTitle, setMessage}){
    return (
        <div className="rounded-xl bg-zinc-800 p-4 flex flex-col items-center h-full gap-4">
            <form action={import.meta.env.VITE_API_URL+"entries"} method="POST"
            className="flex flex-col gap-4 h-full">
                <label htmlFor="username">Title:</label>
                <input placeholder="John Doe" type="text" name="username" id="username" size={85} className="p-2 rounded-xl"
                value={title} onChange={e => setTitle(e.target.value)}/>
                <label htmlFor="password">Message:</label>
                <textarea name="message" cols="30" className="p-2 rounded-xl h-full"
                value={message} onChange={e => setMessage(e.target.value)}/>
                <button type="submit" className="mt-8">Submit</button>
            </form>
        </div>
    )
}

export default NewEntryForm