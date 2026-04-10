import { User, X } from "lucide-react";
import { useChatStore } from "../store/chatstore";
import { useAuthStore } from "../store/authstore";
import { Link } from "react-router-dom";


const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return ( 
    <div className="p-2.5 border-b border-base-300 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
  <Link to="/otherprofile" className="w-10 h-10  bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl backdrop-blur-sm shadow-lg shadow-indigo-500/25 hover:scale-110 transition-all duration-300 flex items-center justify-center">

          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/mikasa.png"} alt={selectedUser.fullName} />
            </div>
          </div>
                          </Link>



          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
       
  
                 
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;