import { useNavigate } from "react-router-dom"
import Button from "../Components/Button"
import GenderSelection from "../Components/GenderSelection"
import Heading from "../Components/Heading"
import Input from "../Components/Input"
import Password from "../Components/Password"
import { useState } from "react"
import useSignup from "../Hooks/UseSignup"

const Signup = () => {
  const Navigate = useNavigate()
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    passWord: "",
    confirmPassword: "",
    gender: "",
    email : ""
  })
  const { loading, Signup } = useSignup()

  const handleCheckboxChange = (gender: "male" | "female") => {
    setInputs({ ...inputs, gender })
  }

  const handleSumitForm = (e: React.FormEvent) => {
    e.preventDefault();
    Signup(inputs)
  }

  return (
    <div className="border-none w-[25rem] border border-gray-100 rounded-md bg-6yellow-200 p-[0.5rem] h-[30rem] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
      <Heading label={"Sign Up"} />
      <form onSubmit={handleSumitForm}>
        <div className="ml-5">
          <Input label={"fullName"} label1={"Malory Deo"} value={inputs.fullName} onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} />
          <Input label={"Username"} label1={"Malory"} value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })} />
          <Password label={"Passowrd"} value={inputs.passWord} onChange={(e) => setInputs({ ...inputs, passWord: e.target.value })} />
          <Input label={"Confirm Password"} label1 = {"*******"} value={inputs.confirmPassword} onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} />

          <GenderSelection
            selectedGender={inputs.gender}
            onCheckBoxChange={handleCheckboxChange}
          />
          <Button label={"Already have an Acoount?"} onClick={() => { Navigate('/Login') }} />
          <button className="btn w-[98%] h-8" disabled={loading}>{loading ? "loading..." : "Signup"}</button>
        </div>
      </form>
    </div>
  )
}

export default Signup