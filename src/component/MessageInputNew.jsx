import { useState } from "react";
import { BsSend } from "react-icons/bs";
import api from "../api";
import { useDispatch } from "react-redux";
import { sendMessages } from "../store/messageSlice";
import Input from "./Input";


const MessageInputNew = ({_id}) => {
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch();
	const sendMessage = async(message) => {
		try {
			setLoading(true)
		const res = await api.post("/api/v1/message/sendMessage", {
			  message,
			  recieverId: _id
			})
			if(res){
				const messageData = res.data.data
				dispatch(sendMessages(messageData))
			}
			setLoading(false)
		  } catch (error) {
			  console.log("error in sending message: ",error )
			  setLoading(false)
		  }
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};

	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<Input
					type='text'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
			</div>
		</form>
	);
};
export default MessageInputNew;

