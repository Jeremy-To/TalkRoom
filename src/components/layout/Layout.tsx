import ErrorMessage from './ErrorMessage';
import Navbar from './Navbar';
type LayoutProps = {
	children: React.ReactNode;
};
export const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className=" flex items-center flex-col bg-blue-50 h-screen">
			<Navbar />
			<ErrorMessage />
			{children}
		</div>
	);
};
