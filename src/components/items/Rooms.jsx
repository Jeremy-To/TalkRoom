import React, { useEffect, useContext, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../store/AuthContext';
import { db } from '../../config/firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';
import useSocket from '../customhooks/useSocket';

export const Rooms = () => {
	const rooms = useSocket();
	const messagesRef = collection(db, 'messages');
	const { setErrorMessage } = useContext(AuthContext);
	const [uniqueRooms, setUniqueRooms] = useState([]);

	const handleNewSnapshot = (snapshot) => {
		try {
			const newRooms = snapshot.docs.map((doc) => doc.data().room);
			const updatedUniqueRooms = [...new Set(newRooms)];
			setUniqueRooms(updatedUniqueRooms);
		} catch (error) {
			setErrorMessage(error.message);
			console.error(error);
		}
	};

	const startSnapshotInterval = () => {
		const queryRef = collection(db, 'messages');
		let unsubscribeRef;

		const handleSnapshotUpdate = (snapshot) => {
			const newRooms = snapshot.docs.map((doc) => doc.data().room);
			const updatedUniqueRooms = [...new Set(newRooms)];
			setUniqueRooms(updatedUniqueRooms);
		};

		const snapshotIntervalId = setInterval(() => {
			unsubscribeRef();
			unsubscribeRef = onSnapshot(queryRef, handleSnapshotUpdate);
		}, 30000);

		unsubscribeRef = onSnapshot(queryRef, handleSnapshotUpdate);

		return snapshotIntervalId;
	};

	useEffect(() => {
		const unsubscribe = onSnapshot(messagesRef, handleNewSnapshot);

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const snapshotIntervalId = startSnapshotInterval();

		return () => clearInterval(snapshotIntervalId);
	}, []);

	const authCtx = useContext(AuthContext);

	const handleRoomClick = useCallback(
		(room) => {
			authCtx.setRoom(room);
			authCtx.setIsInChat(true);
		},
		[authCtx]
	);

	return (
		<section>
			<div className="bg-blue-400 text-white m-auto rounded-md w-3/4 lg:w-1/2 text-2xl text-center my-4">
				<h1>All rooms</h1>
			</div>
			<div className=' m-auto rounded-md w-3/4 lg:w-1/2 text-2xl text-center my-4'>
					{uniqueRooms.length === 0 && (
						<p className="text-red-500">No rooms yet, please create one</p>
					)}
					{uniqueRooms.length > 0 && (
						<p className="text-green-500">Click on a room to enter</p>
					)}
				</div>
			<div className="h-3/4 w-3/4 px-28 py-10 lg:w-1/2 m-auto flex flex-col items-center rounded-md overflow-hidden border border-solid border-blue-800">
				<div className="flex flex-col items-start overflow-y-auto mb-2">
					{uniqueRooms.map((room) => (
						<button
							key={room}
							className="p-4 flex items-start mb-2 bg-white text-black rounded-md hover:bg-blue-700 hover:text-white active:bg-yellow-300"
							onClick={() => handleRoomClick(room)}
						>
							<Link to="/chat">{room}</Link>
						</button>
					))}
				</div>
			</div>
		</section>
	);
};
