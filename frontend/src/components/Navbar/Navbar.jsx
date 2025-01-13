function Navbar({newEntry, logOut}){
    return (
        <div className="flex flex-row gap-2 p-2 bg-zinc-800 rounded-lg border border-zinc-600">
            <button className="bg-zinc-700 text-sm border border-zinc-600 drop-shadow-lg" onClick={newEntry}>New Entry</button>
            <button className="bg-red-900 text-sm border border-red-600 drop-shadow-lg" onClick={logOut}>Log Out</button>
        </div>
    )
}

export default Navbar