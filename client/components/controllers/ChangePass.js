import axios from 'axios'
import {toast} from 'react-toastify'
async function ChangePass(password,user){
    const server=import.meta.env.VITE_SERVER
    await axios.post(server+'password/changePass',{password,user}).then(res=>{
        if(res.data.result=='success'){
            toast.success(res.data.msg)
        }
        else{
            toast.error(res.data.msg)
        }
    })
}
export default ChangePass;