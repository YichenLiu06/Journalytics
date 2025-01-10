function EntryCard({title, message, timestamp, handleClick}){
    return (
        <div className="rounded-xl p-2 flex flex-col gap-2 bg-zinc-700" onClick={handleClick}>
            <div className="flex flex-col">
                <h2>{title}</h2> 
                <h2 className="text-sm text-zinc-500">{timestamp.toLocaleString()}</h2>
            </div>
            <p className="text-zinc-500 line-clamp-3 text-sm">{message}</p>
        </div>
    )
}

export default EntryCard;