import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../store/AuthContext';
function ToRoom({ room }) {
	const authCtx = useContext(AuthContext);
	return (
		<button
			key={room}
			className="flex items-start mb-2 bg-white text-black rounded-md p-2 hover:bg-blue-700 hover:text-white active:bg-yellow-300"
			onClick={({ room }) => {
				authCtx.setRoom({ room });
				authCtx.setIsInChat(true);
			}}
		>
			<Link to="/chat"> {room}</Link>
		</button>
	);
}

export default ToRoom;
