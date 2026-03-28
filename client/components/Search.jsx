import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import Friend from './controllers/Friend';
const Search = () => {
    const navigate=useNavigate()
    const location=useLocation()?.state
    const server=import.meta.env.VITE_SERVER
    const[users,setUsers]=useState([])
    const[auth,setAuth]=useState(location?.auth || false)
    const[user,setUser]=useState(location?.user || {})
    useEffect(()=>{
        console.log()
        if(!auth){
            navigate('/')
        }
        else{
            axios.get(server+"user/allUsers").then(res=>{
                setUsers(res.data)
            })
        }
    },[])
  return (
    <>
      <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30 flex flex-col items-center">
    <style>{`
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: #475569;
            border-radius: 10px;
            border: 2px solid transparent;
            background-clip: content-box;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #3b82f6;
        }
        * {
            scrollbar-width: thin;
            scrollbar-color: #475569 transparent;
        }
    `}</style>

    {/* Sticky Navigation Header */}
    <nav className="w-full sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-blue-900/20 py-4 flex justify-center px-4 md:px-8">
        <div className="max-w-7xl w-full flex items-center justify-between">
            <div className="flex items-center gap-6">
                {/* Back Button */}
                <button onClick={()=>{
                    navigate('/chat',{state:{auth:location.auth,user:location.user}})
                }} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/50 border border-blue-900/30 text-slate-400 hover:text-blue-400 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-300 group shadow-lg">
                    <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="text-xs font-bold tracking-widest uppercase hidden sm:inline">Back</span>
                </button>

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        ROYAL<span className="text-blue-500">ID</span>
                    </span>
                </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-blue-500 font-mono font-bold leading-none">SYSTEM STATUS</span>
                    <span className="text-[10px] text-green-500 font-mono animate-pulse">ENCRYPTED // ONLINE</span>
                </div>
            </div>
        </div>
    </nav>

    <main className="w-full max-w-7xl px-4 md:px-8 flex flex-col items-center py-10">
        {/* Search Section */}
        <div className="w-full max-w-2xl mb-12">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-500"></div>
                <div className="relative flex items-center bg-slate-900 border border-blue-900/50 rounded-2xl p-1 shadow-2xl backdrop-blur-sm">
                    <div className="pl-4 pr-2 text-blue-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search directory (100+ identities)..."
                        className="w-full bg-transparent border-none focus:ring-0 text-slate-100 text-base py-4 px-2 placeholder:text-slate-600 font-medium"
                    />
                    <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-3 px-6 rounded-xl transition-all active:scale-95 whitespace-nowrap">
                        FILTER
                    </button>
                </div>
            </div>
            <p className="text-center mt-4 text-slate-500 text-xs font-medium tracking-wide">
                Showing <span className="text-blue-400">100 active</span> personnel in the Royal Database
            </p>
        </div>

        {/* 100 User Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {users.map((ele, i) => {
            return ele.userId !==user.userId?(
                    <div onClick={()=>{
                       Friend(user.userId,ele.userId)
                    }} key={i} className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative flex items-center gap-4 bg-slate-900/60 border border-blue-900/20 hover:border-blue-500/50 p-4 rounded-2xl transition-all duration-300 backdrop-blur-sm cursor-pointer hover:translate-y-[-2px] hover:shadow-xl hover:shadow-blue-900/10">
                        {/* Avatar Tile */}
                        <div className="relative flex-shrink-0">
                            {
                                ele.profile? <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden transform group-hover:rotate-3 transition-transform duration-300">
                                <img 
                                    src={ele.profile} 
                                    alt="User" 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>:<div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg">
      {`${ele.firstname || ""} ${ele.lastname || ""}`.split(" ").map(word => word[0]).join("").toUpperCase()           
}
            </div>
                            }
                           
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#020617] rounded-full shadow-lg"></div>
                        </div>

                        {/* Info Tile */}
                        <div className="flex flex-col min-w-0">
                            <h3 className="text-slate-100 font-bold text-sm truncate group-hover:text-blue-400 transition-colors">
                                {ele.firstname} {ele.lastname}
                            </h3>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="font-mono text-[10px] text-blue-500 font-bold tracking-wider">
                                    {ele.userId}
                                </span>
                                <span className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">
                                    {i % 3 === 0 ? "friend" : "not friend"}
                                </span>
                            </div>
                        </div>

                        {/* Action Icon */}
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>)
                :null
                        
})}
        </div>

        {/* Footer */}
        <footer className="w-full mt-20 pb-10 border-t border-blue-900/20 flex flex-col items-center">
            <button className="mt-12 flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900/50 border border-blue-900/30 text-slate-400 hover:text-white hover:bg-slate-800 transition-all group">
                <svg className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-widest">Return to Top</span>
            </button>
            <p className="mt-8 text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]">
                End of Directory — Encrypted Connection
            </p>
        </footer>
    </main>
</div>
    </>
  );
};

export default Search;