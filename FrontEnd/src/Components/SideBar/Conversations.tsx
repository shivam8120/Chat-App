import useUserData from "../../Hooks/useUserData";
import { getRandomEmoji } from "../../utils/Emoji";
import Conversation from "./Conversation";

const Conversations = () => {
    const { userDataStore, isLoading } = useUserData();

    // Check if userDataStore is not null before rendering
    if (!userDataStore) {
        return (
            <div className='flex flex-col py-2 overflow-auto'>
                {isLoading ? (
                    <span className='mx-auto loading loading-spinner' />
                ) : (
                    <span className='mx-auto'>No conversations available.</span>
                )}
            </div>
        );
    }

    return (
        <div className='flex flex-col py-2 overflow-auto'>
            {userDataStore.map((conversation) => (
                <Conversation key={conversation.id} conversation={conversation} emoji={getRandomEmoji()} />
            ))}
            {isLoading ? <span className='mx-auto loading loading-spinner' /> : null}
        </div>
    );
};

export default Conversations;