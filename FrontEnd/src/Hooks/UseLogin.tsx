import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext"
import toast from "react-hot-toast";

interface loginInputs {
    username : string;
    passWord : string;
}

const useLogin = () => {
  const {setAuthUser} = useAuthContext();
  const [loading,setLoading] = useState(false)

  const Login = async (inputs : loginInputs) => {
     try {
        setLoading(true)
        const res = await fetch('/api/auth/login',{
            method : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs)
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error(data.error)
        }
        setAuthUser(data)
        
     } catch (error : any) {
        toast.error(error.message)
     }finally{
        setLoading(false)
     }
  }
  return {loading,Login}
}

export default useLogin