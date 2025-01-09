import Insights from "../../components/Insights/Insights"
import NewEntryForm from "../../components/NewEntryForm/NewEntryForm"
import Entries from "../../components/Entries/Entries"
import { useState } from "react"
function Dashboard(){
    const [message, setMessage] = useState(null)
    const [title, setTitle] = useState(null)

    return (
        <div className='w-screen h-screen flex justify items-center gap-4'>
            <Insights />
            <NewEntryForm message={message} title={title} setMessage={setMessage} setTitle={setTitle} />
            <Entries />
        </div>
    )
}

export default Dashboard;