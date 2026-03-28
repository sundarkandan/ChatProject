import axios from "axios";
import {toast} from 'react-toastify'
async function Friend(user,friend){
    const server=import.meta.env.VITE_SERVER;
    const checking=confirm("Are You sure to add this friend")
    if(checking){
         await axios.post(server+'user/addFriend',{user,friend}).then(res=>{
        if(res.data.result=="success"){
            toast.success(res.data.msg)
        }
        else{
            toast.error(res.data.msg)
        }
    })
    }
}
export default Friend;