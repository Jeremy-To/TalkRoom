import React from 'react';
import { SignIn } from './SignIn';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../store/AuthContext';

function Home() {
	const { isAuth } = useContext(AuthContext);

	return (
		<section >
			{!isAuth ? (
				<SignIn />
			) : (
				<div className='flex flex-col items-center justify-center gap-2 shadow-lg p-20 mt-4'>
					<h1 className='text-2xl text-blue-900'>Welcome !</h1>
					<div className='bg-yellow-300 rounded-md p-2 underline'>
						<Link to="/lobby">Go to Lobby</Link>
					</div>
				</div>
			)}
		</section>
	);
}

export default Home;
