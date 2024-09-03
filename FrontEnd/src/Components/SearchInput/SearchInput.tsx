import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoSearchCircleSharp } from "react-icons/io5";
import { useConversationContext } from '../../Context/ConversationContext';
import useUserData from '../../Hooks/useUserData';


type ConversationType = {
	id: string;
	fullName: string;
	profilePic: string;
};

const SearchInput = () => {
    const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversationContext()
	const { userDataStore } = useUserData()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}
        if(userDataStore === null){
            return ""
        }

		const conversation = userDataStore.find((c: ConversationType) =>
			c.fullName.toLowerCase().includes(search.toLowerCase())
		);

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};
  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
    <input
        type='text'
        placeholder='Search…'
        className='w-full rounded-full input-sm md:input input-bordered sm:rounded-full'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />
    <button type='submit' className=''>
    <IoSearchCircleSharp className="text-6xl text-blue-500 cursor-pointer hover:text-gray-500 w-fit" />
    </button>
</form>
  )
}

export default SearchInput