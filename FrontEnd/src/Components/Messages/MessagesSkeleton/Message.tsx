import { useAuthContext } from "../../../Context/AuthContext";
import { messagesType, useConversationContext } from "../../../Context/ConversationContext";
import { extractTime } from "../../../utils/ExtractTime";



const Message = ({ message }: { message: messagesType }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversationContext();

	const fromMe = message?.senderId === authUser?.id;
	const img = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;
	const chatClass = fromMe ? "chat-end" : "chat-start";

	const bubbleBg = fromMe ? "bg-blue-500" : "";
	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClass}`}>
			<div className='hidden md:block chat-image avatar'>
				<div className='w-6 rounded-full md:w-10'>
					<img alt='Tailwind CSS chat bubble component' src={img} />
				</div>
			</div>
			<p className={`chat-bubble text-white ${bubbleBg} ${shakeClass} text-sm md:text-md`}>{message.body}</p>
			<span className='flex items-center gap-1 text-xs text-white opacity-50 chat-footer'>
				{extractTime(message.createdAT)}
			</span>
		</div>
	);
};
export default Message;
