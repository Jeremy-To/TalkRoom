import { useContext } from 'react';
import { AuthContext } from '../../store/AuthContext';

export const SignIn = () => {
	const { updateLoginStatus } = useContext(AuthContext);
	return (
		<div className="flex flex-col items-center">
			<h1 className="inline-block text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-2xl my-8 mx-4 font-bold">
				With ChatApp, share and stay in touch with the ones you care
			</h1>
			<button
				className="w-40 h-16 border-none bg-white text-blue-800 rounded-md cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white"
				onClick={updateLoginStatus}
			>
				Sign In with Google
			</button>
			<p className="mt-2 text-xs w-40"> Sign In With Google To Continue </p>
		</div>
	);
};
