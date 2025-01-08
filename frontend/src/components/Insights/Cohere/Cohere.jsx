function Cohere(){
    return (
        <div className="flex flex-col gap-4">
            <h2>AI Insights:</h2>
            <div className = "rounded-xl p-2 h-24 bg-zinc-900 w-full"></div>
            <div className="rounded-xl p-2 bg-zinc-700 w-full">
                Analyzed Mood: 
            </div>
            <button className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Generate Insights</button>
        </div>
    )
}

export default Cohere;