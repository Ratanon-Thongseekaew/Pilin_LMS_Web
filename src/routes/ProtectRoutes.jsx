import React, { useEffect, useState } from 'react'
import useAuthStore from '../store/auth-store';
import { actionCurrentUser } from '../api/auth';

function ProtectRoutes({el,allows}) {
    const user = useAuthStore((state)=>state.user)
    const token = useAuthStore((state)=>state.token)
    const [isProtect,setIsProtect] = useState(null);
    useEffect(()=>{
        //code
        checkPermission()
    },[])

    const checkPermission =async()=>{
        //code body
        console.log("check permission")
        try {
            const res = await actionCurrentUser(token);
            //recieve role from backend
            const role = res.data.result.role
            console.log(role)
            // if(allows.includes(role)){
            //     setIsProtect(true)
            // }else{
            //     setIsProtect(false)
            // }
            setIsProtect(allows.includes(role))
        } catch (error) {
            console.log(error)
            setIsProtect(false)
        }
    };
    console.log(isProtect)
    if(isProtect ===null){
        return<h1>Loading...</h1>
    }
    if(!isProtect){
        return <h1>Unauthorized!!!</h1>
    }
  return el
}

export default ProtectRoutes;