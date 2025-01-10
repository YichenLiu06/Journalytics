import Cohere from "./Cohere/Cohere";
import MatrixChart from "./Charts/MatrixChart";

function Insights({chat, sentiment, generateInsights}){
    return (
        <div className="rounded-xl bg-zinc-800 h-full w-full p-4 flex flex-col gap-4">
            <Cohere sentiment={sentiment} chat={chat} generateInsights={generateInsights}/>
            <MatrixChart />
            <MatrixChart />
        </div>
    )
}

export default Insights;