
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './Context/AuthContext.tsx'
import { ConversationContextProvider } from './Context/ConversationContext.tsx'
import { SocketContectProvider } from './Context/SocketContext.tsx'



ReactDOM.createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
      <AuthContextProvider>
        <ConversationContextProvider>
          <SocketContectProvider>
            <App />
          </SocketContectProvider>
        </ConversationContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  
)
