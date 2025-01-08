import { useState } from 'react'
import LoginForm from './pages/LoginForm/LoginForm'
import SignUpForm from './pages/SignUpForm/SignUpForm'
import NewEntryForm from './components/NewEntryForm/NewEntryForm'
import Insights from './components/Insights/Insights'
import Entries from './components/Entries/Entries'
import './App.css'

function App() {

  return (
    <div className='w-screen h-screen flex justify items-center gap-4'>
      <Insights />
      <NewEntryForm />
      <Entries />
    </div>
    
  )
}

export default App
