import EntryCard from "./EntryCard/EntryCard";
import './Entries.css'

function Entries(){
    return (
        <div className="flex flex-col gap-4 p-4 w-full h-full bg-zinc-800 max-h-screen overflow-y-scroll">
            <h2>Entries </h2>
            <EntryCard title="This is a Journal Entry" message="Hello World!"/>
            <EntryCard title="This is a Journal Entry" message="Hello World!"/>
            <EntryCard title="This is a Journal Entry" message="Hello World!"/>
            <EntryCard title="This is a Journal Entry" message="Hello World!"/>
            <EntryCard title="This is a Journal Entry" message="Hello World!"/>
            <EntryCard title="This is a Journal Entry" message="Hello World!"/>
            <EntryCard title="This is a Journal Entry" message="Hello World!"/>
            <EntryCard title="This is a Journal Entry" message="Hello World!"/>
            <EntryCard title="This is a Journal Entry" message="Hello World!"/>
            <EntryCard title="This is a Journal Entry" message="Hello World!"/>
        </div>
    )
}

export default Entries;