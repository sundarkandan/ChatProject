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
import ChangePassword from '../components/ChangePassword'
import Search from "../components/Search"

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/chat' element={<ChatPage/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/password' element={<ChangePassword/>}/>
    <Route path='/search' element={<Search/>}/>
   </Routes>
   </>
  )
}

export default App
