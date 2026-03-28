import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
const ChatPage = () => {
  const navigate=useNavigate()
  const location=useLocation()
  const auth=location.state?.auth || false
  const[user,setUser]=useState({})
  const server=import.meta.env.VITE_SERVER
const [sender,setSender]=useState(null)
  const[selected,setSelected]=useState(null)
  useEffect(()=>{
    console.log(user)
    if(!auth ){
      navigate('/')
    }
    
  },[auth, navigate])

  const userId=location.state?.user?.userId
  useEffect(()=>{
    console.log(user)
    axios.get(server+"user/",{params:{userId}}).then(res=>{
      setUser(res.data)
    })
    
  },[userId,server])
  return (
    <>
      <div className="h-screen w-full bg-zinc-950 font-sans selection:bg-indigo-500/30 overflow-hidden relative text-zinc-300">
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
  </div>

  <div className="relative w-full h-full bg-zinc-900/60 backdrop-blur-xl flex overflow-hidden">
    
    {/* CONTACT LIST SIDEBAR */}
    <div className="w-80 border-r border-zinc-800/50 flex flex-col bg-zinc-900/40 hidden md:flex">
      <div className="h-20 flex items-center px-6 border-b border-zinc-800/50">
      
        <h2 className="text-xl font-bold text-white tracking-tight">Messages</h2>
       
      </div>
     
      <div className="p-4">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search chats..." 
            className="w-full bg-zinc-800/40 border border-zinc-700/50 rounded-xl py-2 px-4 text-sm outline-none focus:border-indigo-500/50 transition-all placeholder:text-zinc-600"
          />
          
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-4 space-y-1">
        {/* Active Contact */}
      

        {/* Other Contacts */}
        {user.friends?user.friends.map((ele, i) => (
          <div onClick={()=>{
            setSelected(i)
            setSender(ele)
            }} key={i} className={`flex items-center ${i==selected?'bg-indigo-500/10 border border-indigo-500/20':""}  gap-4 p-3 rounded-2xl hover:bg-zinc-800/40 border border-transparent hover:border-zinc-700/30 transition-all cursor-pointer group`}>
            <div className="relative">
              {
                ele.profile? <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] transition-all hover:rotate-6 active:scale-90">
              <div className="h-full w-full rounded-[14px] bg-zinc-900 overflow-hidden">
                <img 
                  src={ele.profile} 
                  alt="User Profile" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>:<div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg">
      {`${ele.firstname || ""} ${ele.lastname || ""}`.split(" ").map(word => word[0]).join("").toUpperCase()           
}
            </div>
              }
              {/* {contact.status === "online" && (
                <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 bg-emerald-500 border-2 border-zinc-900 rounded-full"></div>
              )} */}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h4 className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors truncate">{ele.firstname} {ele.lastname}</h4>
                <span className="text-[10px] text-zinc-600">sdfa</span>
              </div>
              <p  className="text-sm font-semibold text-white truncate">asdfas</p>
            </div>
          </div>
        )):""}
      </div>
    </div>

    {/* FULL SCREEN CHAT INTERFACE */}
    <div className="flex-1 flex flex-col min-w-0 bg-zinc-900/20">
      {/* Chat Header */}
      <div className="h-20 flex items-center justify-between px-8 border-b border-zinc-800/50 bg-zinc-900/20 backdrop-blur-md">
       {
        sender? <div className="flex items-center gap-4">
           {
                sender.profile? <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] transition-all hover:rotate-6 active:scale-90">
              <div className="h-full w-full rounded-[14px] bg-zinc-900 overflow-hidden">
                <img 
                  src={sender.profile} 
                  alt="User Profile" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>:<div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg">
      {`${sender.firstname || ""} ${sender.lastname || ""}`.split(" ").map(word => word[0]).join("").toUpperCase()           
}
            </div>
              }
          <div>
            <h3 className="text-white font-semibold text-base tracking-tight">{sender.firstname} {sender.lastname}</h3>
            <p className="text-xs text-zinc-400 font-medium">Online</p>
          </div>
        </div>:""
       }

        {/* User Profile Icon */}  <input 
            type="text" 
            placeholder="Search Users" 
            onClick={()=>{
              navigate('/search',{state:{auth,user}})
            }}
            className="w-75 bg-zinc-800/40 border border-zinc-700/50 rounded-xl py-2 px-4 text-sm outline-none focus:border-indigo-500/50 transition-all placeholder:text-zinc-600"
          />
  
        <div className="flex items-center gap-4" onClick={()=>{
          navigate('/dashboard',{state:{user,auth:true}})
        }}>
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-bold text-white">{user.firstname || ""} {user.lastname|| ""}</span>
            <span className="text-[10px] text-indigo-400/80 font-medium uppercase tracking-wider">{user.userId|| ""}</span>
          </div>
          <div className="relative group cursor-pointer">
            {
              user.profile? <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] transition-all hover:rotate-6 active:scale-90">
              <div className="h-full w-full rounded-[14px] bg-zinc-900 overflow-hidden">
                <img 
                  src={user.profile} 
                  alt="User Profile" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>:<div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg">
      {`${user.firstname || ""} ${user.lastname || ""}`.split(" ").map(word => word[0]).join("").toUpperCase()           
}
            </div>
            }
           
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-indigo-500 rounded-full border-2 border-zinc-900 shadow-lg"></div>
          </div>
        </div>
 
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar">
        <div className="max-w-4xl mx-auto w-full flex flex-col space-y-8">
          
          <div className="flex justify-center opacity-0 [animation:fade-in_0.5s_ease-out_forwards]">
            <span className="bg-zinc-800/50 text-zinc-500 text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full border border-zinc-700/30">
              Today, October 24
            </span>
          </div>

          {/* Receiver Message */}
          <div className="flex justify-start opacity-0 translate-x-[-20px] [animation:slide-in-left_0.4s_ease-out_forwards_0.2s]">
            <div className="max-w-[85%] md:max-w-[70%] bg-zinc-800/80 border border-zinc-700/50 text-zinc-100 p-5 rounded-3xl rounded-tl-none shadow-xl">
              <p className="text-base leading-relaxed">Hey! I saw the design you sent over. The dark theme looks incredible. Can we start implementing the chat module today?</p>
              <span className="text-[10px] text-zinc-500 mt-2 block text-right font-medium uppercase">09:41 AM</span>
            </div>
          </div>

          {/* Sender Message with Seen Ticks */}
          <div className="flex justify-end opacity-0 translate-x-[20px] [animation:slide-in-right_0.4s_ease-out_forwards_0.4s]">
            <div className="max-w-[85%] md:max-w-[70%] bg-indigo-600 text-white p-5 rounded-3xl rounded-tr-none shadow-lg shadow-indigo-500/20">
              <p className="text-base leading-relaxed">Absolutely! I've already set up the layout and the Tailwind config. We just need to wire up the animations now.</p>
              <div className="flex items-center justify-end gap-1.5 mt-2">
                <span className="text-[10px] text-indigo-200 uppercase font-bold tracking-tight">09:43 AM</span>
                <div className="flex items-center text-emerald-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m7 13 5 5 10-10"/><path d="m2 13 5 5 2.5-2.5"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Sender Image Message */}
          <div className="flex justify-end opacity-0 translate-x-[20px] [animation:slide-in-right_0.4s_ease-out_forwards_0.6s]">
            <div className="max-w-[85%] md:max-w-[70%] bg-zinc-800/40 border border-zinc-700/50 p-2 rounded-3xl rounded-tr-none shadow-xl">
              <div className="relative group overflow-hidden rounded-2xl bg-zinc-900 aspect-video flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                 <div className="w-full h-full bg-indigo-500/10 flex items-center justify-center border border-dashed border-zinc-700 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-700"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                 </div>
                 <div className="absolute bottom-3 left-4 z-20">
                    <p className="text-xs font-semibold text-white">preview-dashboard-v2.png</p>
                    <p className="text-[10px] text-zinc-400">2.4 MB</p>
                 </div>
              </div>
              <div className="flex items-center justify-end gap-1.5 p-2">
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-tight">09:44 AM</span>
                <div className="flex items-center text-emerald-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m7 13 5 5 10-10"/><path d="m2 13 5 5 2.5-2.5"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* System Event */}
          <div className="flex  opacity-0 [animation:fade-in_0.6s_ease-out_forwards_1s]">
            <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-3 py-1 rounded-lg border border-emerald-500/20">
              John is typing...
            </span>
          </div>
        </div>
      </div>

      {/* Chat Input with File & Image UI */}
      <div className="p-6 md:p-8 bg-zinc-900/40 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-3">
          
          <div className="relative flex items-center gap-2 bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-2 transition-all focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
            
            <div className="flex items-center gap-1 pl-2">
              <button className="h-9 w-9 flex items-center justify-center rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-700/50 transition-all active:scale-90">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.51a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
              </button>
              <button className="h-9 w-9 flex items-center justify-center rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-700/50 transition-all active:scale-90">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
              </button>
            </div>

            <div className="h-6 w-[1px] bg-zinc-700/50 mx-1"></div>

            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 bg-transparent border-none outline-none text-white text-base py-2.5 px-2 placeholder:text-zinc-600"
            />
            
            <button className="h-10 px-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl flex items-center justify-center font-bold text-xs tracking-widest shadow-lg shadow-indigo-500/30 transition-all active:scale-95 shrink-0">
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <style>{`
    @keyframes slide-in-left {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slide-in-right {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes zoom-in {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 5px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(63, 63, 70, 0.4);
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(99, 102, 241, 0.3);
    }
  `}</style>
</div>
    </>
  );
};

export default ChatPage;