import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../config/firebase-config';
import { collection, query, onSnapshot } from 'firebase/firestore';

export const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const roomsRef = collection(db, 'messages');
  const unsuscribeRef = useRef();
  useEffect(() => {
    let intervalId;
    unsuscribeRef.current = onSnapshot(query(roomsRef), (snapshot) => {
      let newRooms = [];
      snapshot.forEach((doc) => {
        newRooms.push({ ...doc.data(), id: doc.id });
      });
      let uniqueRooms = [...new Set(newRooms.map((room) => room.room))];
      setRooms(uniqueRooms);
    });
  
    intervalId = setInterval(() => {
      unsuscribeRef.current();
      unsuscribeRef.current = onSnapshot(query(roomsRef), (snapshot) => {
        let newRooms = [];
        snapshot.forEach((doc) => {
          newRooms.push({ ...doc.data(), id: doc.id });
        });
        let uniqueRooms = [...new Set(newRooms.map((room) => room.room))];
        setRooms(uniqueRooms);
      });
    }, 5000);
  
    return () => {
      clearInterval(intervalId);
      unsuscribeRef.current();
    };
  }, [roomsRef]);
  
  return (
    <section className="w-full h-full">
      <div className="bg-blue-400 text-white m-auto rounded-md w-3/4 lg:w-1/2 text-2xl text-center my-4">
        <h1>All rooms</h1>
      </div>
      <div className="h-3/4 w-3/4 lg:w-1/2 m-auto flex flex-col items-center rounded-md overflow-hidden border border-solid border-blue-800">
        <div className="flex flex-col items-start w-full h-4/5 overflow-y-auto p-2 mb-2">
        {rooms.map((room) => (
  <div key={room} className="flex items-start mb-2 bg-white text-black rounded-md">
    {room}
  </div>
))}
        </div>
      </div>
    </section>
  );
};
