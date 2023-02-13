import Navbar from './Navbar';
export const Layout = ({ children }) => {
	return (
		<div className=" flex items-center flex-col bg-blue-50 h-screen">
			<Navbar />
			{children}
		</div>
	);
};
