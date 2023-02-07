import React, { createContext, useState } from 'react';
import { auth, provider } from '../firebase-config';
import { signOut, signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
	const [isInChat, setIsInChat] = useState(null);
	const [room, setRoom] = useState('');

	const signInWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			cookies.set('auth-token', result.user.refreshToken);
			setIsAuth(true);
		} catch (err) {
			console.error(err);
		}
	};
	const updateLoginStatus = async () => {
		await signOut(auth);
		cookies.remove('auth-token');
		setIsAuth(false);
		setIsInChat(false);
		setIsAuthenticated(current => !current)
		{isAuthenticated && signInWithGoogle()}
	};

	const context = {
		isAuthenticated,
		updateLoginStatus,
		isAuth,
		setIsAuth,
		isInChat,
		room,
		setRoom,
    setIsInChat,
	};

	return (
		<AuthContext.Provider value={context}>{children}</AuthContext.Provider>
	);
};
