import { useSelector } from "react-redux";
import { extractTime } from "../utils/extractTime.js";
import userImage from "./Images/user.png"
import api from "../api.js";
import { useDispatch } from "react-redux";

const MessageSkeleton = ({ message, createdAt, senderId, _id}) => {
	const userData = useSelector((state) => state.auth.userData)
	const fromMe = senderId === userData?._id;
	const dispatch = useDispatch()
	const formattedTime = extractTime(createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? userData.avatar : userImage ;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-600";

	const deleteMessage = async() => {
		await api.post("/api/v1/message/deleteMessage", {messageId: _id}).then((res) => {
			if(res.status) {
				return true
			}
		}).catch((err) => {
			console.log("An error occour while delte the message: ", err)
		})

	}
	
	return (
		<div className={`chat ${chatClassName} relative group cursor-pointer`} key={_id}>
			<div className='chat-image avatar flex'>
				<div className='w-10 h-10 rounded-full object-fill'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} className="rounded-full w-10 h-10" />
				</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} max-w-60 rounded-2xl px-3 py-2 ml-2  pb-2`}>{message}</div>
			<div
			onClick={deleteMessage}
			className={`w-14 h-7 px-1 rounded-2xl bg-red-700 text-white opacity-0
			 group-hover:opacity-100 transition-opacity duration-300 ${fromMe ? "block" : "hidden"}`}>
				delete
				</div>
			</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center ml-1'>{formattedTime}</div>
		</div>
	);
};
export default MessageSkeleton;