import Insights from "../../components/Insights/Insights"
import NewEntryForm from "../../components/NewEntryForm/NewEntryForm"
import Entries from "../../components/Entries/Entries"
import EntryCard from "../../components/Entries/EntryCard/EntryCard"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
function Dashboard(){
    const [message, setMessage] = useState(null)
    const [title, setTitle] = useState(null)
    const [chat, setChat] = useState(null)
    const [sentiment, setSentiment] = useState(null)
    const [entries, setEntries] = useState([])
    useEffect(() => {
        async function handleAuthenticate(){
            if(window.localStorage.getItem("token") === null){
                navigate("/login")
            }
            else{
                const authenticateResponse = await fetch(import.meta.env.VITE_API_URL + "/authenticated", {
                    method: "get",
                    headers: new Headers({
                        'Authorization' : 'Bearer ' + window.localStorage.getItem("token")
                    })
                })
                if(!authenticateResponse.ok){
                    navigate("/login")
                }
                else{
                    const entriesResponse = await fetch(import.meta.env.VITE_API_URL + "/entries", {
                        method: "get",
                        headers: new Headers({
                            'Authorization' : 'Bearer ' + window.localStorage.getItem("token")
                        })
                    })
                    const entriesData = await entriesResponse.json()
                    setEntries(entriesData)
                }
            }
        }
        handleAuthenticate()
    }, [])

    async function submitEntry(){
        const data = new URLSearchParams();
        data.append('title', title)
        data.append('content', message)
        const submitEntryResponse = await fetch(import.meta.env.VITE_API_URL + "/entries", {
            method: "post",
            headers: new Headers({
                'Authorization' : 'Bearer ' + window.localStorage.getItem("token")
            }),
            body: data
        })
    }

    async function generateInsights(){
        const data = new URLSearchParams();
        data.append('content', message)
        const generateInsightsResponse = await fetch(import.meta.env.VITE_API_URL + "/insights", {
            method: "post",
            headers: new Headers({
                'Authorization' : 'Bearer ' + window.localStorage.getItem("token")
            }),
            body: data
        })
        const insights = await generateInsightsResponse.json()
        setChat(insights.analysis)
        setSentiment(insights.sentiment)
    }

    function parseISOString(s) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    }

    return (
        <div className='w-screen h-screen flex justify items-center gap-4'>
            <Insights sentiment={sentiment} chat={chat} generateInsights={generateInsights}/>
            <NewEntryForm message={message} title={title} setMessage={setMessage} setTitle={setTitle} handleSubmit={submitEntry} />
            <div className="flex flex-col gap-4 p-4 w-full h-full bg-zinc-800 max-h-screen overflow-y-scroll">
                <h2>Entries </h2>
                {entries.map(entry => 
                    <EntryCard 
                    title={entry.title} 
                    message={entry.content} 
                    timestamp={parseISOString(entry.created_at)} 
                    handleClick = {e => {
                        setTitle(entry.title)
                        setMessage(entry.content)
                    }}/>
                )}
            </div>
        </div>
    )
}

export default Dashboard;