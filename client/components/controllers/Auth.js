import axios from 'axios'
import { toast } from 'react-toastify'

async function Auth(UserInput,role,navigate){
    
    const server=import.meta.env.VITE_SERVER
    console.log(UserInput,role)
    if(role=='Register'){
        await axios.post(server+'chatsite/authRegister',UserInput).then(res=>{
            const result=res.data.result;
            if(result=='success'){
               
                navigate('/chat',{state:{auth:true,user:res.data.user}})
            }
            else if(result=='duplicate'){
                toast.warn(res.data.msg)
            }
            else{
                toast.error(res.data.msg)
            }
        })
        
    }
    if(role=='Login'){
        await axios.post(server+'chatsite/authLogin',UserInput).then(res=>{
            const result=res.data.result;
            if(result=='success'){
                
                navigate('/chat',{state:{auth:true,user:res.data.user}})
            }
            else{
                toast.error(res.data.msg)
            }
        })
    }
}   
export default Auth;