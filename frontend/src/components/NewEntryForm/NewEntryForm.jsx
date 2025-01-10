function NewEntryForm({title, message, setTitle, setMessage, handleSubmit}){
    return (
        <div className="rounded-xl bg-zinc-800 p-4 flex flex-col items-center h-full gap-4">
            <form
            className="flex flex-col gap-4 h-full">
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" size={85} className="p-2 rounded-xl"
                value={title} onChange={e => setTitle(e.target.value)}/>
                <label htmlFor="message">Message:</label>
                <textarea name="message" cols="30" className="p-2 rounded-xl h-full"
                value={message} onChange={e => setMessage(e.target.value)}/>
                <button type="submit" className="mt-8" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default NewEntryForm