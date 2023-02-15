import React, { useState, useEffect, useRef, useContext } from 'react';
import { db } from '../../config/firebase-config';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../store/AuthContext';
export const Rooms = () => {
	const [rooms, setRooms] = useState([]);
	const roomsRef = collection(db, 'messages');
	const unsuscribeRef = useRef();
	const { setErrorMessage } = useContext(AuthContext);

	useEffect(() => {
		let intervalId;
		const queryRef = query(roomsRef);

		const handleSnapshot = (snapshot) => {
			try {
				let newRooms = [];
				snapshot.forEach((doc) => {
					newRooms.push({ ...doc.data(), id: doc.id });
				});
				let uniqueRooms = [...new Set(newRooms.map((room) => room.room))];
				setRooms(uniqueRooms);
			} catch (error) {
				setErrorMessage(error.message);
				console.error(error);
			}
		};

		const startInterval = () => {
			intervalId = setInterval(() => {
				try {
					unsuscribeRef.current();
					unsuscribeRef.current = onSnapshot(queryRef, handleSnapshot);
				} catch (error) {
					setErrorMessage(error.message);
					console.error(error);
				}
			}, 5000);
		};

		try {
			unsuscribeRef.current = onSnapshot(queryRef, handleSnapshot);
			startInterval();
		} catch (error) {
			setErrorMessage(error.message);
			console.error(error);
		}

		//We need the line below because we are using useRef and we need to clean the memory
		if(unsuscribeRef.current) unsuscribeRef.current();

		return () => {
			clearInterval(intervalId);
			try {
				unsuscribeRef.current();
			} catch (error) {
				setErrorMessage(error.message);
				console.error(error);
			}
		};
	}, [roomsRef]);



	return (
		<section>
			<div className="bg-blue-400 text-white m-auto rounded-md w-3/4 lg:w-1/2 text-2xl text-center my-4">
				<h1>All rooms</h1>
			</div>
			<div className="h-3/4 w-3/4 p-28 lg:w-1/2 m-auto flex flex-col items-center rounded-md overflow-hidden border border-solid border-blue-800">
				<div className="flex flex-col items-start overflow-y-auto p-2 mb-2">
					{rooms.length === 0 && ( <p className="text-red-500">No rooms yet, please create one</p> )}
					{rooms.length > 0 && ( <p className="text-green-500">Click on a room to enter</p> )}
					{rooms.map((room) => (
						<button
							key={room}
							className="p-4 flex items-start mb-2 bg-white text-black rounded-md hover:bg-blue-700 hover:text-white active:bg-yellow-300"
							onClick={({ room }) => {
								authCtx.setRoom({ room });
								authCtx.setIsInChat(true);
							}}
						>
							<Link to="/chat"> {room}</Link>
						</button>
					))}
				</div>
			</div>
		</section>
	);
};
