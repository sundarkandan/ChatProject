import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
import Chat from '../components/ChatPage'
import ChatPage from '../components/ChatPage'
import Dashboard from '../components/DashBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/chat' element={<ChatPage/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    
   </Routes>
   </>
  )
}

export default App
