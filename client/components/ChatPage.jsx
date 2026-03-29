import React from 'react';
import { useState ,useRef} from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {io} from "socket.io-client"

const socket=io(import.meta.env.VITE_SERVER)
const ChatPage = () => {
  const navigate=useNavigate()
  
  const location=useLocation()
  const auth=location.state?.auth || false
  const[user,setUser]=useState({})
  const server=import.meta.env.VITE_SERVER
const [reciver,setReciver]=useState("")
  const[selected,setSelected]=useState(null)
const[messages, setMessages]=useState([])
  const[message,setMessage]=useState({reciver:reciver.userId || "",reciver:user.userId || " ",sendermsg:""})
  const [istyping,setIstyping]=useState(false)
  const scrollRef = useRef(null); // Scroll reference object
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const typingTimeoutRef = useRef(null); // Timer-ah store panna

  // Message area-ku auto-scroll logic
  useEffect(() => {
    const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
    const timer = setTimeout(scrollToBottom, 100); 

  return () => clearTimeout(timer);
}, [messages, reciver]);
  useEffect(()=>{
    console.log(user)
    if(!auth ){
      navigate('/')
    }
   
  },[auth, navigate])

 useEffect(()=>{
      setMessage({...message,reciver:reciver.userId,sender:user.userId})
    },[reciver,user])

  const userId=location.state?.user?.userId


  useEffect(()=>{
    console.log(user)
    axios.get(server+"user/",{params:{userId}}).then(res=>{
      setUser(res.data)
      setMessages(res.data.messages)
      console.log(res.data.messages)
    })
    
  },[])
useEffect(()=>{
    socket.on('istyping',(cond)=>{
      setIstyping(cond)
    })
    socket.on('nottyping',(con)=>{
      setIstyping(con)
    })
},[message.sendermsg])
//socket useEffect
  useEffect(()=>{
  socket.connect()
 if(user){
   socket.emit('userid',{sender:user.userId})   
} 
},[user])





useEffect(()=>{
   socket.on('recive_message',(msg)=>{
setMessages(msg);
console.log(msg)
  return () => {
    socket.off('recive_message'); // Cleanup must
  };
   })
},[message])
  return (
    <>
      <div className="h-screen w-full bg-zinc-950 font-sans selection:bg-indigo-500/30 overflow-hidden relative text-zinc-300">
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
  </div>

  <div className="relative w-full h-full bg-zinc-900/60 backdrop-blur-xl flex overflow-hidden">
    
    {/* CONTACT LIST SIDEBAR */}
<div className={`${isSidebarOpen ? 'flex w-full' : 'hidden'} md:flex md:w-80 border-r border-zinc-800/50 flex flex-col bg-zinc-900/40`}>
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
            setReciver(ele)
            setMessage({})
            setIsSidebarOpen(false);
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
               
              </div>
              
            </div>
          </div>
        )):""}
      </div>
    </div>

    {/* FULL SCREEN CHAT INTERFACE */}
    <div className={`${!isSidebarOpen ? 'flex' : 'hidden'} md:flex flex-1 flex flex-col min-w-0 bg-zinc-900/20`}>
      {/* Chat Header */}
      <div className="flex items-center gap-4">
  {/* Mobile Back Button */}
  <button 
    onClick={() => setIsSidebarOpen(true)} 
    className="md:hidden p-2 -ml-2 text-zinc-400 hover:text-white"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  </button>
  
  {/* Existing Receiver Profile Info... */}
</div>
      <div className="h-20 flex items-center justify-between px-8 border-b border-zinc-800/50 bg-zinc-900/20 backdrop-blur-md">
       {
        reciver? <div className="flex items-center gap-4">
           {
                reciver.profile? <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] transition-all hover:rotate-6 active:scale-90">
              <div className="h-full w-full rounded-[14px] bg-zinc-900 overflow-hidden">
                <img 
                  src={reciver.profile} 
                  alt="User Profile" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>:<div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg">
      {`${reciver.firstname || ""} ${reciver.lastname || ""}`.split(" ").map(word => word[0]).join("").toUpperCase()           
}
            </div>
              }
          <div>
            <h3 className="text-white font-semibold text-base tracking-tight">{reciver.firstname} {reciver.lastname}</h3>
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
{
  reciver?<>
  
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar">
        <div className="max-w-4xl mx-auto w-full flex flex-col space-y-8">
          
          <div className="flex justify-center opacity-0 [animation:fade-in_0.5s_ease-out_forwards]">
            <span className="bg-zinc-800/50 text-zinc-500 text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full border border-zinc-700/30">
              Today, October 24
            </span>
          </div>

          {/* Receiver Message */}
          {
            messages.map((ele,idx)=>{
             if(reciver.userId==ele.reciver){
               if(ele.sendermsg){
                return(
               

           <div className="flex justify-end opacity-0 translate-x-[20px] [animation:slide-in-right_0.4s_ease-out_forwards_0.4s]">
            <div className="max-w-[85%] md:max-w-[70%] bg-indigo-600 text-white p-5 rounded-3xl rounded-tr-none shadow-lg shadow-indigo-500/20">
              <p className="text-base leading-relaxed">{ele.sendermsg}</p>
              <div className="flex items-center justify-end gap-1.5 mt-2">
                <span className="text-[10px] text-indigo-200 uppercase font-bold tracking-tight">{ele.time}</span>
               
              </div>
            </div>
          </div>
              )
              }
              else{
                return(
                   <div className="flex justify-start opacity-0 translate-x-[-20px] [animation:slide-in-left_0.4s_ease-out_forwards_0.2s]">
            <div className="max-w-[85%] md:max-w-[70%] bg-zinc-800/80 border border-zinc-700/50 text-zinc-100 p-5 rounded-3xl rounded-tl-none shadow-xl">
              <p className="text-base leading-relaxed">{ele.recivermsg}</p>
              <span className="text-[10px] text-zinc-500 mt-2 block text-right font-medium uppercase">{ele.time}</span>
            </div>
          </div>
                )
              }
             }
            })
          }

          {istyping?<div className="flex opacity-0 [animation:fade-in_0.4s_ease-out_forwards,blink_1.5s_infinite_ease-in-out_0.4s]">
    <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-3 py-1 rounded-lg border border-emerald-500/20 flex items-center gap-2">
      {/* Oru chinna dot animation-um sethukalam */}
      <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
      {reciver.firstname} {reciver.lastname} is typing...
    </span>
  </div>:""}
          <div ref={scrollRef} />
        </div>
      </div>

      {/* Chat Input with File & Image UI */}
      <div className="p-6 md:p-8 bg-zinc-900/40 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-3">
          
          <div className="relative flex items-center gap-2 bg-zinc-800/30 border border-zinc-700/50 rounded-2xl p-2 transition-all focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
            
            

            
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={message.sendermsg}
              
              onChange={(e)=>{
                setMessage({...message,sendermsg:e.target.value})
                socket.emit('istyping',message)
                 if(!e.target.value){
                socket.emit('nottyping',(message))
                
              }
              if (typingTimeoutRef.current) {
    clearTimeout(typingTimeoutRef.current);
  }

  // 3. Pudhu timer set pannunga (1 second wait pannum)
  typingTimeoutRef.current = setTimeout(() => {
    socket.emit('nottyping', message);
  }, 1000)
              }}
              className="flex-1 bg-transparent border-none outline-none text-white text-base py-2.5 px-2 placeholder:text-zinc-600"
            />
            
            <button onClick={async ()=>{
            
              
              
              console.log(message)
              socket.emit('message',message)
             socket.emit('nottyping',message)
              
              setMessage({ ...message, sendermsg: "" });
            }} className="h-10 px-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl flex items-center justify-center font-bold text-xs tracking-widest shadow-lg shadow-indigo-500/30 transition-all active:scale-95 shrink-0">
              SEND
            </button>
          </div>
        </div>
      </div>
  </>:""
}
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