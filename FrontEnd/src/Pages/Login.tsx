import { useNavigate } from "react-router-dom"
import Button from "../Components/Button"
import Heading from "../Components/Heading"
import Input from "../Components/Input"
import Password from "../Components/Password"
import { useState } from "react"
import useLogin from "../Hooks/UseLogin"




const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    passWord: ""
  })
  const Navigate = useNavigate()
  const { Login, loading } = useLogin()


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    Login(inputs)
  }
  return (
    <div className="border-none w-[25rem] border border-gray-100 rounded-md bg-6yellow-200 p-[0.5rem] h-[20rem] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
      <Heading label={"Log In"} />
      <form onSubmit={handleLogin}>
        <div className="ml-4">
          <Input label={"Username"} label1={"username"} value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })} />
          <Password label={"Passowrd"} value={inputs.passWord} onChange={(e) => setInputs({ ...inputs, passWord: e.target.value })} />
          <Button label={"Don't have an Account?"} onClick={() => { Navigate('/Signup') }} />
          <button className="btn w-[97%] h-6" disabled={loading}>{loading ? "laoding..." : "Log In"}</button>
        </div>
      </form>
    </div>
  )
}

export default Login