import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Chat from './pages/Chat';
import Lobby from './pages/Lobby';
import { SignIn } from './pages/SignIn.js';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/chat" element={<Chat />} />
					<Route path="/about" element={<About />} />
					<Route path="/lobby" element={<Lobby />} />
					<Route path="/login" element={<SignIn />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
