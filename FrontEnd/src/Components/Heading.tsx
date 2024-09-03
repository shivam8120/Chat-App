

const Heading = ({label} : Define) => {
  return (
    <div className="flex justify-center space-x-2">
        <span className="flex text-4xl">{label} 
        </span>
        <h1 className="text-4xl text-blue-500">ChatApp</h1>
        
    </div>
  )
}

export default Heading