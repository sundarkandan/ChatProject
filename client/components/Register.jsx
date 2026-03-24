import React from 'react';
import { Link } from 'react-router-dom';
import Auth from './controllers/Auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const[newUser,setNewUser]=useState({
    firstname:"",
    lastname:"",
    userId:"",
    password:""
})
const navigate=useNavigate()
  return (
    <>
      <div className="min-h-screen w-full bg-zinc-950 flex flex-col items-center justify-center p-4 font-sans selection:bg-indigo-500/30">
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-indigo-500/10 rounded-full blur-[100px]" />
    <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-indigo-500/10 rounded-full blur-[100px]" />
  </div>

  <div className="relative w-full max-w-[420px] bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/50 rounded-[2rem] p-6 sm:p-8 shadow-2xl transition-all duration-500 hover:border-zinc-700/50 my-auto">
    <div className="mb-6 text-center">
      <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20 -rotate-3 transition-transform hover:rotate-0 duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Create account</h1>
      <p className="text-zinc-400 text-sm">Join our community today</p>
    </div>

    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-zinc-400 ml-1 uppercase tracking-wider">First Name</label>
          <input
            type="text"
            onChange={(e)=>{setNewUser({...newUser,firstname:e.target.value})}}
            className="w-full bg-zinc-800/30 border border-zinc-700/50 text-white text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all placeholder:text-zinc-600 shadow-inner"
            placeholder="John"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-zinc-400 ml-1 uppercase tracking-wider">Last Name</label>
          <input
            type="text"
              onChange={(e)=>{setNewUser({...newUser,lastname:e.target.value})}}
            className="w-full bg-zinc-800/30 border border-zinc-700/50 text-white text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all placeholder:text-zinc-600 shadow-inner"
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-zinc-400 ml-1 uppercase tracking-wider">Unique Username</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <span className="text-zinc-500 text-sm font-medium">@</span>
          </div>
          <input
            type="text"
            className="w-full bg-zinc-800/30 border border-zinc-700/50 text-white text-sm rounded-xl pl-8 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all placeholder:text-zinc-600 shadow-inner"
            placeholder="johndoe"
              onChange={(e)=>{setNewUser({...newUser,userId:e.target.value})}}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-zinc-400 ml-1 uppercase tracking-wider">Password</label>
        <input
          type="password"
          className="w-full bg-zinc-800/30 border border-zinc-700/50 text-white text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all placeholder:text-zinc-600 shadow-inner"
          placeholder="••••••••"
            onChange={(e)=>{setNewUser({...newUser,password:e.target.value})}}
        />
      
      </div>

      <button
        type="button"
        onClick={(e)=>Auth(newUser,'Register',navigate)}
        className="group relative w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-200 active:scale-[0.98] overflow-hidden mt-2"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          Get Started
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </button>
    </form>

    <div className="mt-6 pt-6 border-t border-zinc-800/50 text-center">
      <p className="text-zinc-400 text-xs font-medium">
        Already have an account?{" "}
        <Link to='/' className="text-indigo-400 font-bold hover:text-indigo-300 transition-all">
          Sign in
        </Link>
      </p>
    </div>
  </div>
</div>
    </>
  );
};

export default Register;