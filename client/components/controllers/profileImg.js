import { toast } from "react-toastify"
import axios from 'axios'
export default async function profileImg(img,userId,profile){
    const server=import.meta.env.VITE_SERVER
    const form=new FormData()
    form.append('profile',img)
    form.append('userId',userId)
    form.append('profile_data',profile)
    await axios.post(server+'profile/profileChange',form,{headers: {
                'Content-Type': 'multipart/form-data'
            }}).then(res=>{
        if(res.data.result=="success"){
            toast.success(res.data.msg)
        }
        else{
            toast.error(res.data.msg)
        }
    })
}   