import { LogOut } from "lucide-react";
import useLogout from "../../Hooks/UseLogout";


const LogoutButton = () => {
	const { logOut } = useLogout();

	return (
		<div className='mt-auto'>
			<LogOut className='w-6 h-6 text-white cursor-pointer' onClick={logOut} />
		</div>
	);
};
export default LogoutButton;
