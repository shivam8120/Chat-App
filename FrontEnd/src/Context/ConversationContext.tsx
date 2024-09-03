import { ReactNode, createContext, useContext, useState } from "react";

type conversationType =  {
    id : string
    fullName : string;
    profilePic : string
}
export type messagesType =  {
    id : string;
    body : string
    senderId : string
    createdAT : string
    shouldShake? : boolean
}

interface conversationContextType {
    selectedConversation : conversationType | null;
    setSelectedConversation : (conversation : conversationType | null) => void
    messages : messagesType[]
    setMessages : (messages : messagesType[]) => void
}

export const ConversationContext = createContext<conversationContextType>({
    selectedConversation : null,
    setSelectedConversation : () => {},
    messages : [],
    setMessages :() => {}
})

export const useConversationContext = () => {
    return useContext(ConversationContext)
}

export const ConversationContextProvider = ({children}: {children : ReactNode}) => {
    const [selectedConversation,setSelectedConversation] = useState<conversationType | null>(null);
    const [messages,setMessages] = useState<messagesType[]>([])
    const value = {
        selectedConversation,
        setSelectedConversation,
        messages,
        setMessages,
    }

    return (
        
        <ConversationContext.Provider value={value}>
            {children}
        </ConversationContext.Provider>
    )

}