import Cohere from "./Cohere/Cohere";
import MatrixChart from "./Charts/MatrixChart";
import { useEffect, useState } from "react";
import 'chartjs-adapter-date-fns';
import { _adapters } from 'chart.js';

function countWords(str) {
    return str.trim().split(/\s+/).length;
}

function isoDayOfWeek(dt) {
    let wd = dt.getDay(); // 0..6, from sunday
    wd = (wd + 6) % 7 + 1; // 1..7 from monday
    return '' + wd; // string so it gets parsed
  }

function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

function Insights({chat, sentiment, generateInsights}){

    const [wordCountData, setWordCountData] = useState(null)

    useEffect(() => {
        async function fetchEntriesOnMonth(date){
            const adapter = new _adapters._date();
            const entriesResponse = await fetch(import.meta.env.VITE_API_URL + `/entries?created_after=${adapter.startOf(date, 'month').toISOString()}&created_before=${adapter.endOf(date, 'month').toISOString()}`, {
                method: "get",
                headers: new Headers({
                    'Authorization' : 'Bearer ' + window.localStorage.getItem("token")
                })
            })
            const entriesData = await entriesResponse.json()
            return entriesData
        }

        async function generateWordCountData(){
            const adapter = new _adapters._date();
            const data = [];
            let dt = adapter.startOf(new Date(), 'month');
            const end = adapter.endOf(dt, 'month');
            const entries = await fetchEntriesOnMonth(dt)
            let i = 0;
            while (dt <= end) {
                let wordCount = 0
                while(i < entries.length && parseISOString(entries[i].created_at).getDate() == dt.getDate()){
                    wordCount += countWords(entries[i].content);
                    i++;
                }
                const iso = adapter.format(dt, 'yyyy-MM-dd');
                data.push({
                    x: isoDayOfWeek(dt),
                    y: iso,
                    d: iso,
                    v: wordCount
                });
                dt = new Date(dt.setDate(dt.getDate() + 1));
            }
            setWordCountData(data)
        }

        generateWordCountData()
        
    }, [])

    return (
        <div className="rounded-xl bg-zinc-800 w-[25%] h-full p-4 flex flex-col gap-4 border border-zinc-600">
            <Cohere sentiment={sentiment} chat={chat} generateInsights={generateInsights}/>
            {wordCountData === null ? <div className="rounded-xl p-4 bg-zinc-700">Loading Charts...</div> : <MatrixChart rawData={wordCountData} />}
        </div>
    )
}

export default Insights;