import { useSelector } from "react-redux";
import { extractTime } from "../utils/extractTime.js";
import userImage from "./Images/user.png"

const MessageSkeleton = ({ message, createdAt, senderId, _id}) => {
	const userData = useSelector((state) => state.auth.userData)
	const fromMe = senderId === userData._id;
	const formattedTime = extractTime(createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? userData.avatar : userImage ;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-600";
	
	const shakeClass = message ? "shake" : "";
	return (
		<div className={`chat ${chatClassName}`} key={_id}>
			<div className='chat-image avatar flex'>
				<div className='w-10 h-10 rounded-full object-fill'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} className="rounded-full w-10 h-10" />
				</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} max-w-60 rounded-2xl px-3 py-2 ml-2  pb-2`}>{message}</div>
			</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center ml-1'>{formattedTime}</div>
		</div>
	);
};
export default MessageSkeleton;