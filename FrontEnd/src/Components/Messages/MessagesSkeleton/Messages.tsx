import useGetMessages from "../../../Hooks/UseGetMessages";
import useChatScroll from "../../../Hooks/useChatScroll";
import useListenMessages from "../../../Hooks/useListenMessages";
import Message from "./Message";
import MessageSkeleton from "./MessagesSkeleton";


const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();

  const ref = useChatScroll(messages) as React.MutableRefObject<HTMLDivElement>;

  return (
    <div className="flex-1 px-4 overflow-auto" ref={ref}>
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages && messages.length > 0 && messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}

      {!loading && (!messages || messages.length === 0) && (
        <p className="text-center text-white">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;