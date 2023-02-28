import { useState, useEffect, useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { AuthContext, AuthContextType } from '../../store/AuthContext';

type Room = string;

export default function useSocket(): Room[] {
	useContext<AuthContextType>(AuthContext);
	const [rooms, setRooms] = useState<Room[]>([]);
	const { setErrorMessage } = useContext<AuthContextType>(AuthContext);

	useEffect(() => {
		const socket: Socket = io('http://localhost:5173');

		socket.on('rooms', (newRooms: Room[]) => {
			try {
				const uniqueRooms = [...new Set(newRooms)];
				setRooms(uniqueRooms);
			} catch (error: any) {
				setErrorMessage(error.message);
				console.error(error);
			}
		});

   socket.disconnect();
	}, [setErrorMessage]);

	return rooms;
}
