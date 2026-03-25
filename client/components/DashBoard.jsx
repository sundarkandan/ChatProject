import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation,useNavigate } from 'react-router-dom';
const DashBoard = () => {
    const auth=useLocation().state?.auth;
    const [user,setUser]=useState(useLocation().state?.user )
    
    const navigate=useNavigate()
    useEffect(()=>{
      console.log(auth,user)
      if(!auth){
        navigate('/')
      }
    },[auth,navigate])
  return (
    <>
      <style>
  {`
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
  `}
</style>

<div className="min-h-screen w-full bg-zinc-950 font-sans selection:bg-indigo-500/30 overflow-y-auto">
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
  </div>

  <div className="relative w-full min-h-screen bg-zinc-900/40 backdrop-blur-3xl border-x border-zinc-800/50 flex flex-col">
    <div className="max-w-4xl mx-auto w-full px-6 py-12 sm:p-16 flex-1">
      <header className="mb-12 flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="h-16 w-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/30 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">Edit Profile</h2>
            <p className="text-zinc-400 text-lg mt-2">Manage your account settings and profile preferences.</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
        
          <button onClick={()=>{
            navigate('/chat',{state:{user,auth}})
          }} type="button" className="group flex items-center justify-center gap-3 bg-zinc-800/50 hover:bg-indigo-600 border border-zinc-700/50 hover:border-indigo-400 px-6 py-3.5 rounded-2xl transition-all duration-300 shadow-lg shrink-0">
            <div className="relative">
              <svg className="w-6 h-6 text-indigo-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
            </div>
            <span className="text-white font-bold text-sm uppercase tracking-widest">Messages</span>
          </button>
        

         <Link to="/">
          <button type="button" className="group flex items-center justify-center gap-3 bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-400 px-6 py-3.5 rounded-2xl transition-all duration-300 shadow-lg shrink-0">
            <svg className="w-6 h-6 text-rose-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-rose-500 group-hover:text-white font-bold text-sm uppercase tracking-widest">Log Out</span>
          </button>
         </Link>
        </div>
      </header>

      <form className="space-y-10">
        <div className="flex flex-col items-center sm:flex-row gap-8 pb-10 border-b border-zinc-800/50">
          <div className="relative group">
            <div className="h-32 w-32 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 p-1 shadow-2xl">
              <div className="h-full w-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
            <label className="absolute bottom-1 right-1 h-10 w-10 bg-indigo-600 rounded-full border-4 border-zinc-900 flex items-center justify-center cursor-pointer hover:bg-indigo-500 transition-all hover:scale-110 shadow-xl">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <input type="file" className="hidden" />
            </label>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-white font-bold text-xl">Profile Picture</h3>
            <p className="text-zinc-500 text-sm mt-2 max-w-xs">Upload a new avatar to personalize your account. High resolution square images work best.</p>
            <div className="mt-4 flex gap-3 justify-center sm:justify-start">
              <button type="button" className="text-xs font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors">Change Photo</button>
              <button type="button" className="text-xs font-bold text-rose-500 uppercase tracking-widest hover:text-rose-400 transition-colors">Remove</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2.5">
            <label className="block text-xs font-bold text-zinc-500 ml-1 uppercase tracking-[0.2em]">First Name</label>
            <input
              type="text"
              className="w-full bg-zinc-800/20 border border-zinc-700/50 text-white text-base rounded-2xl px-5 py-4 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-600"
              defaultValue={user.firstname}
            />
          </div>
          <div className="space-y-2.5">
            <label className="block text-xs font-bold text-zinc-500 ml-1 uppercase tracking-[0.2em]">Last Name</label>
            <input
              type="text"
              className="w-full bg-zinc-800/20 border border-zinc-700/50 text-white text-base rounded-2xl px-5 py-4 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-600"
              defaultValue={user.lastname}
            />
          </div>
        </div>

        <div className="space-y-2.5">
          <label className="block text-xs font-bold text-zinc-500 ml-1 uppercase tracking-[0.2em]">Unique Username</label>
          <div className="relative group">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-500 font-bold text-lg">@</span>
            <input
              type="text"
              className="w-full bg-zinc-800/20 border border-zinc-700/50 text-white text-base rounded-2xl pl-11 pr-5 py-4 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              defaultValue={user.userId}
            />
          </div>
        </div>

      

        <div onClick={()=>{
              navigate('/password',{state:{auth,user}})
            }} className="space-y-2.5">
          <label className="block text-xs font-bold text-zinc-500 ml-1 uppercase tracking-[0.2em]">Security Settings</label>
          <button
            type="button"
            className="w-full flex items-center justify-between bg-zinc-800/20 border border-zinc-700/50 text-white text-base rounded-2xl px-5 py-4 hover:bg-zinc-800/40 hover:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all group"
          >
            <div  className="flex items-center gap-3">
              <div className="h-8 w-8 bg-zinc-800 rounded-lg flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="font-medium">Change Password</span>
            </div>
            <svg className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="pt-12 mt-12 flex flex-col sm:flex-row items-center justify-end gap-4 border-t border-zinc-800/50">
          
          <button
            type="button"
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black py-5 px-14 rounded-2xl shadow-2xl shadow-indigo-500/30 transition-all duration-300 active:scale-95 uppercase tracking-widest"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
    </>
  );
};

export default DashBoard;