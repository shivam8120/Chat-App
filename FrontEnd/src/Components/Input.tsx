interface InputProps {
  label: string;
  label1: string;
  value: string; // Assuming value is a string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

}
const Input = ({label,label1,value,onChange} : InputProps) => {
  return (
    <div>
        <label className="w-full max-w-xs form-control">
  <div className="label">
    <span className="label-text">{label}</span>
  </div>
  <input value={value} onChange={onChange} type="text" placeholder={label1} className="w-[22rem] h-10  input input-bordered" />
  
</label>
    </div>
  )
}

export default Input