
interface ButtonProps {
  label: string;
  onClick?: () => void;
}



const Button = ({ label, onClick }: ButtonProps) => {


  return (
    <div>
      <button className="my-2 underline" onClick={onClick}>
        {label}
      </button>
    </div>
  )
}

export default Button