import React, { useContext } from 'react';
import { Chat } from './components/items/Chat';
import { SignIn } from './components/items/SignIn.jsx';
import { Layout } from './components/layout/Layout';
import { AuthContext } from './store/AuthContext';

function App() {
	const { isAuth, setIsAuth, isInChat, setIsInChat, room, setRoom } =
		useContext(AuthContext);
	if (!isAuth) {
		return (
			<Layout
				isAuth={isAuth}
				setIsAuth={setIsAuth}
				setIsInChat={setIsInChat}
			>
				<SignIn setIsAuth={setIsAuth} />
			</Layout>
		);
	}

	return (
		<Layout isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
			{!isInChat ? (
				<div className="flex flex-col items-center">
					<label className="items-center text-xl mb-4">Enter room name:</label>
					<input
						className=" w-40 h-8 border-solid border-2 border-blue-200 rounded-md pl-2 text-sm text-center m-2"
						onChange={(e) => setRoom(e.target.value)}
					/>
					<button
						className="w-20 h-8 border-none rounded-md p-2 text-xs text-center m-2 bg-blue-400 text-white cursor-pointer hover:bg-blue-800"
						onClick={() => {
							setIsInChat(true);
						}}
					>
						Enter Chat
					</button>
				</div>
			) : (
				<Chat room={room} />
			)}
		</Layout>
	);
}

export default App;
