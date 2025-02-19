function Cohere({chat, sentiment, generateInsights}){
    return (
        <div className="flex flex-col gap-4">
            <h2 className="font-semibold">AI Insights:</h2>
            <div className = "rounded-xl p-2 h-52 bg-zinc-900 w-full overflow-y-scroll">{chat}</div>
            <div className="rounded-xl p-2 bg-zinc-900 w-full font-semibold">
                Analyzed Mood: <span className="font-normal">{sentiment}</span>
            </div>
            <button className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border border-pink-500" onClick={generateInsights}>Generate Insights</button>
        </div>
    )
}

export default Cohere;