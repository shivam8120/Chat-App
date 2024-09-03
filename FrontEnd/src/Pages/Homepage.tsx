
import MessageContainer from "../Components/Messages/MessagesSkeleton/MessagesContainer";
import SideBar from "../Components/SideBar/Sidebar";


const Homepage = () => {



  return (
    <div className='flex h-[80vh] w-full md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
    <SideBar />
    <MessageContainer />
  </div>
  );
};



export default Homepage;