import React, { createContext, useState, ReactNode } from 'react';
import { auth, provider } from '../config/firebase-config';
import { signOut, signInWithPopup, UserCredential } from 'firebase/auth';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

type AuthProviderProps = {
	children: ReactNode;
}

export type AuthContextType = {
	isAuthenticated: boolean;
	updateLoginStatus: () => Promise<void>;
	isAuth: string | undefined;
	setIsAuth: React.Dispatch<React.SetStateAction<string | undefined>>;
	isInChat: boolean | null;
	room: string;
	setRoom: React.Dispatch<React.SetStateAction<string>>;
	setIsInChat: React.Dispatch<React.SetStateAction<boolean | null>>;
	errorMessage: string | null;
	setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
};

export const AuthContext = createContext<AuthContextType>(
	{} as AuthContextType
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isAuth, setIsAuth] = useState<string | undefined>(
		cookies.get('auth-token')
	);
	const [isInChat, setIsInChat] = useState<boolean | null>(null);
	const [room, setRoom] = useState('');
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const signInWithGoogle = async (): Promise<void> => {
		try {
			const result: UserCredential = await signInWithPopup(auth, provider);
			cookies.set('auth-token', result.user?.refreshToken);
			setIsAuth(result.user?.refreshToken);
		} catch (err: any) {
			console.error(err);
			setErrorMessage(err.message);
		}
	};

	const updateLoginStatus = async (): Promise<void> => {
		await signOut(auth);
		cookies.remove('auth-token');
		setIsAuth(undefined);
		setIsInChat(false);
		setIsAuthenticated((current) => !current);
		if (isAuthenticated) {
			signInWithGoogle();
		}
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
		errorMessage,
		setErrorMessage,
	};

	return (
		<AuthContext.Provider value={context}>{children}</AuthContext.Provider>
	);
};
