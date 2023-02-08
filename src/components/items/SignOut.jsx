import React, { useContext } from 'react';
import { AuthContext } from '../../store/AuthContext';
function SignOut() {
	const { updateLoginStatus, isAuth } = useContext(AuthContext);

	return (
		<div>
			{isAuth && (
			  <button
					className="bg-red-400 text-white rounded-md px-2 h-8 hover:bg-red-700"
					onClick={updateLoginStatus}
				>
					Sign Out
				</button>
			)}
		</div>
	);
}

export default SignOut;
