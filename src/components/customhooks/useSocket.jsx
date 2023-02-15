import { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '../../store/AuthContext';

export default function useSocket() {
  const { setErrorMessage } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:5173');

    socket.on('rooms', (newRooms) => {
      try {
        const uniqueRooms = [...new Set(newRooms)];
        setRooms(uniqueRooms);
      } catch (error) {
        setErrorMessage(error.message);
        console.error(error);
      }
    });

    return () => socket.disconnect();
  }, []);

  return rooms;
}
