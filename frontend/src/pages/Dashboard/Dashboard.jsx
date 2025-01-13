import Insights from "../../components/Insights/Insights"
import NewEntryForm from "../../components/NewEntryForm/NewEntryForm"
import EntryCard from "../../components/EntryCard/EntryCard"
import Navbar from "../../components/Navbar/Navbar"
import EntryPanel from "../../components/EntryPanel/EntryPanel"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
function Dashboard(){
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [title, setTitle] = useState('')
    const [chat, setChat] = useState(null)
    const [sentiment, setSentiment] = useState(null)
    const [entries, setEntries] = useState([])
    const [timestamp, setTimestamp] = useState(new Date())
    const [activeEntry, setActiveEntry] = useState(false)
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

    function logOut(){
        window.localStorage.removeItem('token')
        navigate('login')
    }

    return (
        <div className="w-screen h-screen flex flex-col gap-4">
            <Navbar 
                newEntry={()=>{
                    setActiveEntry(false)
                    setMessage('')
                    setTitle('')
                }}
                logOut={logOut}
            />
            <div className='w-screen flex flex-row items-stretch gap-4 shrink min-h-0 h-full'>
                <Insights sentiment={sentiment} chat={chat} generateInsights={generateInsights}/>
                {activeEntry ? <EntryPanel title={title} message={message} timestamp={timestamp}/> : <NewEntryForm message={message} title={title} setMessage={setMessage} setTitle={setTitle} handleSubmit={submitEntry} />}
                <div className="flex flex-col gap-4 p-4 w-[25%] h-full bg-zinc-800 overflow-y-scroll border border-zinc-600 rounded-xl">
                    <h2 className="font-semibold">Entries: </h2>
                    <div className="flex flex-col gap-4">
                        {entries.map(entry => 
                            <EntryCard 
                            title={entry.title} 
                            message={entry.content} 
                            timestamp={parseISOString(entry.created_at)} 
                            handleClick = {e => {
                                setActiveEntry(true)
                                setTitle(entry.title)
                                setMessage(entry.content)
                                setTimestamp(parseISOString(entry.created_at))
                            }}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;