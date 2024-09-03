interface PasswordProps {
  label: string;
  value?: string; // Assuming value is a string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

}


const Password = ({label,value,onChange} : PasswordProps ) => {
  return (
    <div>
        <label className="w-full max-w-xs form-control">
  <div className="label">
    <span className="label-text">{label}</span>
  </div>
  <input value={value} onChange={onChange} type="password" className="w-[22rem] h-10  input input-bordered" />
  
</label>
    </div>

  )
}

export default Password