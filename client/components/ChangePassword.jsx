import React from 'react';
import { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import ChangePass from './controllers/ChangePass';
const ChangePassword = () => {
  const navigate=useNavigate()
  const location=useLocation().state
  const[user,setUser]=useState(location.user)
  const[auth,setAuth]=useState(location.auth)

  const [password,setPassword]=useState({})
  return (
    <>
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-blue-500/30">
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
            background: #475569; /* Slate-600 */
            border-radius: 10px;
            border: 2px solid transparent;
            background-clip: content-box;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #3b82f6; /* Blue-500 on hover */
        }
        /* For Firefox */
        * {
            scrollbar-width: thin;
            scrollbar-color: #475569 transparent;
        }
    `}
  </style>

  <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[95vh]">
    <div className="mb-6 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-xl mb-3 border border-blue-500/20">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h1 className="text-xl font-bold text-white tracking-tight">Security Update</h1>
      <p className="text-slate-400 text-sm mt-1">Change your account password</p>
    </div>

    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-400 ml-1 block">
          Current Password
        </label>
        <div className="relative group">
          <input
            type="password"
            onChange={(e)=>setPassword({...password,current:e.target.value})}
            placeholder="Current password"
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200"
          />
        </div>
      </div>

      <div className="h-px bg-slate-800 my-2"></div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-400 ml-1 block">
          New Password
        </label>
        <div className="relative group">
          <input
            type="password"
            placeholder="Min. 8 characters"
            onChange={(e)=>setPassword({...password,newPass:e.target.value})}
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200"
          />
        </div>
      </div>

     

      <div className="pt-2">
        <button
        onClick={()=>ChangePass(password,user)}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-900/20 active:scale-[0.98] flex items-center justify-center space-x-2 text-sm"
        >
          <span>Update Password</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
      </div> <div className="pt-2">
        <button
        onClick={()=>{
          navigate("/dashboard",{state:{auth,user}})
        }}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-900/20 active:scale-[0.98] flex items-center justify-center space-x-2 text-sm"
        >
          <span>Go Back</span>
          
        </button>
        
      </div>

      <div className="flex items-center justify-center space-x-2 pt-2 opacity-60">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          SSL Encryption Active
        </p>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default ChangePassword;