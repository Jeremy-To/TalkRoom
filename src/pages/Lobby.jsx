import React from 'react';
import { useContext, useState } from 'react';
import { AuthContext } from '../store/AuthContext';
import { Link } from 'react-router-dom';
import { Rooms } from '../components/items/Rooms';

function Lobby() {
	const authCtx = useContext(AuthContext);
	const [room, setRoom] = useState('');
	const onChangeHandler = (e) => {
		setRoom(e.target.value);
	};
	const onClickHandler = () => {
		authCtx.setRoom(room);
		authCtx.setIsInChat(true);
	};

	return (
		<section className="w-full mt-4 h-full flex justify-center">
			<Rooms />
			<div className="mr-4 flex flex-col items-center">
				<label className="items-center text-xl mb-4">Enter custom room:</label>
				<input
					className=" w-40 h-8 border-solid border-2 border-blue-200 rounded-md pl-2 text-sm text-center m-2"
					onChange={onChangeHandler}
				/>
				<button
					className="w-20 h-12 border-none rounded-md p-2 text-xs text-center m-2 bg-blue-400 text-white cursor-pointer hover:bg-blue-800"
					onClick={onClickHandler}
				>
					<Link to="/chat">Enter the room</Link>
				</button>
			</div>
		</section>
	);
}

export default Lobby;
