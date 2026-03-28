import { toast } from "react-toastify"
import axios from "axios";
export default async function userDetails(userDetails){
    const server=import.meta.env.VITE_SERVER;
    console.log(userDetails)
    await axios.post(server+'user/userDetails',userDetails).then(res=>{
        console.log(userDetails)
        if(res.data.result=='success'){
            toast.success(res.data.msg)
        }
        else{
            toast.error(res.data.msg)
        }
    })
}   