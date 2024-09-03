import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface authUserType {
    id: string;
    fullName: string;
    username: string;
    profilePic: string;
    gender: string;
}

const authContext = createContext<{
    authUser: authUserType | null;
    setAuthUser: Dispatch<SetStateAction<authUserType | null>>
    isLoading: boolean
    setisLoading : Dispatch<SetStateAction<boolean>>
}>({
    authUser: null,
    setAuthUser: () => { },
    isLoading: true,
    setisLoading : () => {}
})

export const useAuthContext = () => {
    return useContext(authContext)
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [authUser, setAuthUser] = useState<authUserType | null>(null)
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
        try {
            const res = await fetch('/api/auth/me')
            const data = await  res.json();
            if (!res.ok) {
                throw new Error(data.error)
            }
            setAuthUser(data)
        } catch (error : any) {
            toast.error(error.message)
        }finally{
            setisLoading(false)
        }
        }
        fetchUser()
    },[])
    return (
        <authContext.Provider value={{
            authUser,
            isLoading,
            setAuthUser,
            setisLoading
        }}>
            {children}
        </authContext.Provider>
    )

}