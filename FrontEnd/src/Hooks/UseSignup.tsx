import { useState } from "react"
import { useAuthContext } from "../Context/AuthContext"
import toast from "react-hot-toast";

type signupInputs = {
    fullName: string;
    username: string;
    email: string;
    passWord: string;
    confirmPassword: string;
    gender: string;
}


const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext();

    const Signup = async (inputs: signupInputs) => {
        try {
            setLoading(true)
            const res = await fetch('/api/auth/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs)
            });
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            setAuthUser(data)
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, Signup }
}

export default useSignup