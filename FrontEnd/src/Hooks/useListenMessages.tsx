import { useEffect } from "react";
import { useConversationContext } from "../Context/ConversationContext";
import { useSocketContext } from "../Context/SocketContext"


const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages, } = useConversationContext()
    useEffect(() => {
        socket?.on("newMessages", (newMessages) => {
            newMessages.shouldShake = true
            setMessages([...messages, newMessages])
        })
        return () => {
            socket?.off("newMessages")
        }

    }, [messages, setMessages, socket])
}

export default useListenMessages