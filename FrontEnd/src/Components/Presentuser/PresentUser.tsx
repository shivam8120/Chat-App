import { useConversationContext } from '../../Context/ConversationContext';
import { useSocketContext } from '../../Context/SocketContext';
import useUserData from '../../Hooks/useUserData';
import { getRandomEmoji } from '../../utils/Emoji';
import { useMemo } from 'react';

const PresentUser = () => {
    

    const { userDataStore } = useUserData();
    const { setSelectedConversation } = useConversationContext();
    const {onlineUsers} = useSocketContext()

    // Memoize the emojis to ensure they are generated only once
    const userEmojis = useMemo(() => {
        return userDataStore ? userDataStore.map(() => getRandomEmoji()) : [];
    }, [userDataStore]);

    
    return (

        userDataStore === null ? (
            <div className="mt-[10rem] ml-[7rem] loading"></div>
        ) : (

            userDataStore.map((data, index) => {
                const isOnline = onlineUsers.includes(data.id);
               
                return (
                    <div
                        key={data.id} // Assuming each user has a unique id
                        className="flex justify-between p-3 px-3 pt-2 cursor-pointer hover:bg-blue-600"

                        onClick={() => { setSelectedConversation(data) }}
                    >
                        <div className="flex">
                            <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                                <div className="w-12 rounded-full">
                                    <img src={data.profilePic} alt={`${data.fullName}'s profile`} />
                                </div>
                            </div>
                            <p className="relative text-2xl top-3 left-2">{data.fullName}</p>
                        </div>
                        <div>
                            <p className="text-3xl">{userEmojis[index]}</p>
                        </div>
                    </div>
                );
            })
        )
    );
}

export default PresentUser;