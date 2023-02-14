import React, { useState, useEffect, useContext } from 'react';
import { db, auth } from '../config/firebase-config';
import { Link } from 'react-router-dom';
import {
	collection,
	addDoc,
	where,
	serverTimestamp,
	onSnapshot,
	query,
	orderBy,
} from 'firebase/firestore';
import { AuthContext } from '../store/AuthContext';

export const Chat = () => {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const messagesRef = collection(db, 'messages');
	const { room, setIsInChat } = useContext(AuthContext);
	
	useEffect(() => {
		const queryMessages = query(
			messagesRef,
			where('room', '==', room),
			orderBy('createdAt')
		);
		const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
			let messages = [];
			snapshot.forEach((doc) => {
				messages.push({ ...doc.data(), id: doc.id });
			});
			setMessages(messages);
		});

		return () => unsuscribe();
	}, [messagesRef, room]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (newMessage === '') return;
		await addDoc(messagesRef, {
			text: newMessage,
			createdAt: serverTimestamp(),
			user: auth.currentUser.displayName,
			room,
		});

		setNewMessage('');
	};

	return (
		<section className="w-full h-full ">
			<button
				className="m-2 bg-white text-blue-600 hover:underline border rounded-md px-2 h-8 flex items-center"
				onClick={() => setIsInChat((current) => !current)}
			>
				<Link to="/lobby">Return to lobby</Link>
			</button>
			<div className="bg-blue-400 text-white m-auto rounded-md w-3/4 lg:w-1/2 text-2xl text-center my-4">
				<h1 key={room}>{room}'s room</h1>
			</div>
			<div className="h-3/4 w-3/4 lg:w-1/2 m-auto flex flex-col items-center rounded-md overflow-hidden border border-solid border-blue-800 bg-white">
				<div className="flex flex-col items-start w-full h-4/5 overflow-y-auto p-2 mb-2">
					{messages.map((message) => (
						<div key={message.id} className="flex items-start mb-2">
							<span className="font-bold mr-2 text-blue-900">
								{message.user}:
							</span>
							{message.text}
						</div>
					))}
				</div>
				<form onSubmit={handleSubmit} className="flex w-full p-2 flex-wrap">
					<input
						className="flex-grow text-sm border-solid border outline-none bg-transparent p-2 rounded-md"
						type="text"
						value={newMessage}
						onChange={(event) => setNewMessage(event.target.value)}
						placeholder="Type your message here..."
					/>
					<button
						className="text-sm w-20 border-none rounded-md outline-none bg-blue-300 text-blue-800 font-bold"
						type="submit"
					>
						Send
					</button>
				</form>
			</div>
		</section>
	);
};
