import { useSelector } from "react-redux";
import { extractTime } from "../utils/extractTime.js";

const MessageSkeleton = (recieverAvatar, { message }) => {
	const currentUser  = useSelector((state) => state.auth.userdata);
	const fromMe = message.senderId === currentUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? currentUser.avatar : recieverAvatar;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor}  pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default MessageSkeleton;