import React from 'react';
import SignOut from '../items/SignOut';
function Navbar() {
	return (
		<div className="flex items-center justify-between text-center text-blue-300 w-full bg-blue-800">
			<h1 className="font-bold text-2xl m-2"> Chat App </h1>
			<SignOut />
		</div>
	);
}

export default Navbar;
