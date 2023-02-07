import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase-config';
import {
	collection,
	addDoc,
	where,
	serverTimestamp,
	onSnapshot,
	query,
	orderBy,
} from 'firebase/firestore';

export const Chat = ({ room }) => {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const messagesRef = collection(db, 'messages');

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
		
		<div className="h-3/4 w-1/2 m-auto flex flex-col items-center rounded-md overflow-hidden border-2 border-solid border-blue-800 bg-white">
			<div className="bg-blue-600 text-white w-full text-center">
				<h1>{room.toUpperCase()}'s room</h1>
			</div>
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
			<form onSubmit={handleSubmit} className="flex w-full p-2">
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
	);
};