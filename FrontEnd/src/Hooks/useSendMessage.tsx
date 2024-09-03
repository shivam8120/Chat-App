
import { useAuthContext } from '../Context/AuthContext'
import { useConversationContext } from '../Context/ConversationContext'
import toast from 'react-hot-toast'

const useSendMessage = () => {
    const { isLoading, setisLoading } = useAuthContext()
  
    const { selectedConversation, messages, setMessages } = useConversationContext()
    const sendMessage = async (message : string) => {
        try {
            setisLoading(true)
            const fetchData = await fetch(`/api/messages/send/${selectedConversation?.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });
            const data = await fetchData.json()
            if (data.error) throw new Error(data.error)
            setMessages([...messages, data])

        } catch (error: any) {
            toast.error(error.message)
        }
        finally{
            setisLoading(false)
        }
    }
    return {isLoading,sendMessage}

}

export default useSendMessage