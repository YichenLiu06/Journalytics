import { useState } from 'react'
import LoginForm from './pages/LoginForm/LoginForm'
import SignUpForm from './pages/SignUpForm/SignUpForm'
import NewEntryForm from './components/NewEntryForm/NewEntryForm'
import Insights from './components/Insights/Insights'
import Entries from './components/Entries/Entries'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="sign-up" element={<SignUpForm />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
