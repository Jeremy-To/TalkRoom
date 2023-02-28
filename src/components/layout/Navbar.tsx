import { useContext } from 'react';
import SignOut from '../items/SignOut';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../store/AuthContext';
function Navbar() {
	const authCtx = useContext(AuthContext);
	return (
		<div className="flex items-center justify-between text-center text-blue-300 w-full bg-blue-800">
			<h1 className="font-bold text-2xl m-2">
				<Link to="/">TalkRoom</Link>
			</h1>

			<div className="flex gap-2 items-center text-white  mx-2">
					<div className='bg-white text-blue-600 hover:underline border rounded-md px-2 h-8 flex items-center'>
						<Link to="/about">About</Link>
					</div>
					{authCtx.isAuth && (
					<SignOut />
					)}
				</div>
		</div>
	);
}

export default Navbar;
