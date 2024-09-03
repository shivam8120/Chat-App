import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

interface IsocketContext {
    socket: Socket | null;
    onlineUsers: string[]
}


const socketContext = createContext<IsocketContext | undefined>(undefined)

export const useSocketContext = (): IsocketContext => {
    const context = useContext(socketContext)
    if (context === undefined) {
        throw new Error("useSocketContext must be used within a socketcontextprovider")
    }
    return context
}

const socketUrl = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";



export const SocketContectProvider = ({ children }: { children: ReactNode }) => {
    const socketRef = useRef<Socket | null>(null)

    const [onlineUsers, setOnlineUsers] = useState<string[]>([])
    const { authUser, isLoading } = useAuthContext()
   

    useEffect(() => {
        if (authUser && !isLoading) {
          
            const socket = io(socketUrl, {
                query: {
                    userId: authUser.id
                }
            })
            socketRef.current = socket

        

            socket.on("getOnlineUsers", (users: string[]) => {
                setOnlineUsers(users)
            })
            return () => {
                socket.close()
                socketRef.current = null
            }
        } else if (!authUser && !isLoading) {
            if (socketRef.current) {
                socketRef.current.close()
                socketRef.current = null;
            }
        }
    }, [authUser])
   

    return <socketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
        {children}
    </socketContext.Provider>

}
