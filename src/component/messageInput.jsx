import { useState } from "react";
import { BsSend } from "react-icons/bs";
import api from "../api";



const MessageInput = ({_id}) => {
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false)
	const sendMessage = async(message) => {
		console.log("Reciver Id in input message", _id)
		try {
			setLoading(true)
			await api.post("/api/v1/message/sendMessage", {
			  message,
			  recieverId: _id
			}).then((res) => {
			  if(res.status){
				return true
			  }
			})
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
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
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
export default MessageInput;

