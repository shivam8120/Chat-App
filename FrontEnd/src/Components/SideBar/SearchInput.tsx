import { useState } from "react";
import { useConversationContext } from "../../Context/ConversationContext";
import useUserData from "../../Hooks/useUserData";
import toast from "react-hot-toast";
import { Search } from "lucide-react";

type ConversationType = {
    id: string;
    fullName: string;
    profilePic: string;
};

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const { setSelectedConversation } = useConversationContext();
    const { userDataStore } = useUserData();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!search) return;
        if (search.length < 3) {
            return toast.error("Search term must be at least 3 characters long");
        }
        if (userDataStore) {
            const conversation = userDataStore.find((c: ConversationType) =>
                c.fullName.toLowerCase().includes(search.toLowerCase())
            );

            if (conversation) {
                setSelectedConversation(conversation);
                setSearch("");
            } else {
                setSelectedConversation(null);
                toast.error("No such user found!");
            }
        } else {
            toast.error("User data is not available.");
        } // Closing brace for handleSubmit
    }; // Closing brace for handleSubmit

    return (
        <form className='flex items-center gap-2' onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Search…'
                className='w-full rounded-full input-sm md:input input-bordered sm:rounded-full'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type='submit' className='text-white btn md:btn-md btn-sm btn-circle bg-sky-500 '>
                <Search className='w-4 h-4 outline-none md:w-6 md:h-6' />
            </button>
        </form>
    );
};

export default SearchInput;