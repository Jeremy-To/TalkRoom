import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthContext';
function ErrorMessage() {
	const { errorMessage } = useContext(AuthContext);
	return <div className="text-xl text-red-600 bg-red-200 w-full text-center">{errorMessage}</div>;
}

export default ErrorMessage;
