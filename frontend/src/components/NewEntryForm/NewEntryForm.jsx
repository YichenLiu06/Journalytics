function NewEntryForm({title, message, setTitle, setMessage, handleSubmit}){
    return (
        <div className="rounded-lg bg-zinc-800 p-4 flex flex-col items-center gap-4 border border-zinc-600 h-full w-[50%]">
            <form
            className="flex flex-col gap-4 h-full w-full">
                <label htmlFor="title" className="font-semibold">Title:</label>
                <input type="text" name="title" className="p-2 rounded-xl bg-zinc-900 w-full"
                value={title} onChange={e => setTitle(e.target.value)}/>
                <label htmlFor="message" className="font-semibold">Message:</label>
                <textarea name="message" className="p-2 rounded-xl w-full h-full bg-zinc-900"
                value={message} onChange={e => setMessage(e.target.value)}/>
                <button type="submit" className="mt-8 border border-zinc-600" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default NewEntryForm