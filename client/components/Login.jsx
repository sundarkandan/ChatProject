import React from 'react';
import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <>
      <div className="min-h-screen w-full bg-zinc-950 flex flex-col items-center justify-center p-4 font-sans selection:bg-indigo-500/30">
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-indigo-500/10 rounded-full blur-[100px]" />
    <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-indigo-500/10 rounded-full blur-[100px]" />
  </div>

  <div className="relative w-full max-w-[380px] bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/50 rounded-[2rem] p-6 sm:p-8 shadow-2xl transition-all duration-500 hover:border-zinc-700/50 my-auto">
    <div className="mb-6 text-center">
      <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20 rotate-3 transition-transform hover:rotate-0 duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Welcome back</h1>
      <p className="text-zinc-400 text-sm">Sign in to your account</p>
    </div>

    <form className="space-y-4">
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-zinc-400 ml-1 uppercase tracking-wider">Username or Email</label>
        <div className="relative group">
          <input
            type="text"
            className="w-full bg-zinc-800/30 border border-zinc-700/50 text-white text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all placeholder:text-zinc-600 shadow-inner"
            placeholder="johndoe@example.com"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center px-1">
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Password</label>
          <a href="#" className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition-colors">Forgot?</a>
        </div>
        <div className="relative group">
          <input
            type="password"
            className="w-full bg-zinc-800/30 border border-zinc-700/50 text-white text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all placeholder:text-zinc-600 shadow-inner"
            placeholder="••••••••"
          />
        </div>
      </div>

      <div className="flex items-center px-1 py-1">
        <label className="relative flex items-center cursor-pointer group">
          <input type="checkbox" className="peer sr-only" />
          <div className="h-4 w-4 bg-zinc-800 border border-zinc-700 rounded transition-all peer-checked:bg-indigo-600 peer-checked:border-indigo-600 group-hover:border-indigo-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white scale-0 peer-checked:scale-100 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="ml-2.5 text-xs font-medium text-zinc-400 transition-colors group-hover:text-zinc-300">Keep me logged in</span>
        </label>
      </div>

      <button
        type="button"
        className="group relative w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-200 active:scale-[0.98] overflow-hidden"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          Sign In
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </button>
    </form>

    <div className="mt-6 pt-6 border-t border-zinc-800/50 text-center">
      <p className="text-zinc-400 text-xs font-medium">
        New to the platform?{" "}
        <Link to="/register" className="text-indigo-400 font-bold hover:text-indigo-300 transition-all">
          Join now
        </Link>
      </p>
    </div>
  </div>
</div>
    </>
  );
};

export default Login;