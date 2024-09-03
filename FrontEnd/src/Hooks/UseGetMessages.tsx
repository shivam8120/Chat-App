
import { useEffect, useState } from 'react'
import { useConversationContext } from '../Context/ConversationContext'
import toast from 'react-hot-toast'

const useGetMessages =  () => {
    const [loading,setLoading] = useState(false)
    const { setMessages, messages, selectedConversation } = useConversationContext()
    useEffect(() => {
        const getMessages = async () => {
            if (!selectedConversation) return
            setLoading(true)
            setMessages([])
            try {
                const response = await fetch(`/api/messages/${selectedConversation?.id}`)
                const jsonResponse = await response.json()
                if (!response.ok) throw new Error(jsonResponse.error)
                setMessages(jsonResponse)
            } catch (error: any) {
                toast.error(error.message)
            }finally {
                setLoading(false)
            }
        }
        getMessages()
    }, [selectedConversation,setMessages])
return {messages,loading}
}

export default useGetMessages