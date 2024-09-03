import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../Context/AuthContext';

interface userDataType {
    id: string;
    fullName: string;
    profilePic: string;
}

const useUserData = () => {
    const { setisLoading,isLoading } = useAuthContext();
    const [userDataStore, setUserData] = useState<userDataType[] | null>(null);
   

    useEffect(() => {
        const userData = async () => {
            setisLoading(true)
                try {
                    const response = await fetch('/api/messages/conversations');
                    const datajson = await response.json();

                    if (!response.ok) {
                        throw new Error(datajson.error);
                    }
                    setUserData(datajson);
                } catch (error: any) {
                    toast.error(error.message);
                }finally{
                    setisLoading(false)
                }
           
        };

        userData();
    }, []); // Add authUser as a dependency

    return { userDataStore,isLoading };
};

export default useUserData;