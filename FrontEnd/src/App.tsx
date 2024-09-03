import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './Pages/Homepage'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { useAuthContext } from "./Context/AuthContext"
import { Toaster } from 'react-hot-toast'



function App() {
  const { authUser } = useAuthContext()
  return (
    <div >
      <Routes>
        <Route path='/' element={authUser ? <Homepage /> : <Navigate to={'/Login'} />} />
        <Route path='/Login' element={!authUser ? <Login /> : <Navigate to={'/'} />} />
        <Route path='/Signup' element={!authUser ? <Signup /> : <Navigate to={'/'} />} />
      </Routes>
      <Toaster/>
      
    </div>
  )
}

export default App
