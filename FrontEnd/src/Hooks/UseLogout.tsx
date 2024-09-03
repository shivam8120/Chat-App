import toast from "react-hot-toast";



const useLogout = () => {
    const logOut = async () => {

        try {

            const res = await fetch('/api/auth/logout', {
                method: "POST",
            });
            const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}
        } catch (error: any) {

            toast.error(error.message)
        }
    }
    return { logOut }
}

export default useLogout