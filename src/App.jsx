import { Route, Routes } from 'react-router-dom';
import { Chat } from './pages/Chat';
import Lobby from './pages/Lobby';
import { SignIn } from './pages/SignIn.jsx';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/chat" exact element={<Chat />} />
				<Route path="/about" exact element={<About />} />
				<Route path="/lobby" exact element={<Lobby />} />
				<Route path="/login" exact element={<SignIn />} />
			</Routes>
		</Layout>
	);
}

export default App;
