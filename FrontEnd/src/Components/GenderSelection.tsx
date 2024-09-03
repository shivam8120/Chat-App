

const GenderSelection = ({selectedGender,onCheckBoxChange} : {
    selectedGender : string;
    onCheckBoxChange : (gender : "male" | "female") => void;
}) => {
    return (
        <div className="flex items-center mt-2 space-x-4">
        <div className="flex items-center space-x-1">
        <label htmlFor="male" className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-300">Male</label>
            <input 
            checked = {selectedGender === "male"}
            onChange={() => onCheckBoxChange("male")}
                type="radio" 
                name="radio-1" 
                className="radio" 
                id="male" 
            />
            
        </div>
        <div className="flex items-center space-x-1">
        <label htmlFor="female" className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-300">Female</label>
            <input 
            checked = {selectedGender === "female"}
            onChange={() => onCheckBoxChange("female")}
                type="radio" 
                name="radio-1" 
                className="radio" 
                id="female" 
            />
           
        </div>
    </div>
    )
}
export default GenderSelection;