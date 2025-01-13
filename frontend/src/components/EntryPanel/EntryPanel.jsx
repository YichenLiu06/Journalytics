function EntryPanel({title, message, setTitle, setMessage, timestamp, handleSubmit}){
    return (
        <div className="rounded-lg bg-zinc-800 p-4 flex flex-col gap-4 border border-zinc-600 h-full w-[50%]">
            <div
            className="flex flex-col gap-4 h-full">
                <h1 className="font-semibold text-base">Title:</h1>
                <div className="rounded-xl p-2 bg-zinc-700 drop-shadow-lg">{title}</div>
                <label htmlFor="message" className="font-semibold">Message:</label>
                <div className=" rounded-xl h-full bg-zinc-700 drop-shadow-lg p-2 overflow-y-scroll">
                    {message}
                </div>
                <div className="text-zinc-500">{timestamp.toLocaleString()}</div>
            </div>
        </div>
    )
}

export default EntryPanel;