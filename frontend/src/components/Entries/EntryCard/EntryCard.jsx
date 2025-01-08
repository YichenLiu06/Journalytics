function EntryCard({title, message}){
    return (
        <div className="rounded-xl p-2 flex flex-col gap-2 bg-zinc-700" >
            <h2>{title}</h2>
            <p className="text-zinc-500">{message}</p>
        </div>
    )
}

export default EntryCard;