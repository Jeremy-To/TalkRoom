import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './store/AuthContext';


const element = document.getElementById('root');
const root = createRoot(element!);
root.render(
	<React.StrictMode>
		<AuthProvider>
				<App />
		</AuthProvider>
	</React.StrictMode>
);
