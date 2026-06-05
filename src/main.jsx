import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Walkthrough from './pages/Walkthrough.jsx';
import Signup from './pages/Signup.jsx';
import Onboarding from './pages/Onboarding.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './css/app.css';

const root = document.getElementById('root');

function RootApp() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Walkthrough />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/onboarding" element={<Onboarding />} />
				<Route
					path="/app"
					element={(
						<ProtectedRoute>
							<App />
						</ProtectedRoute>
					)}
				/>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

ReactDOM.createRoot(root).render(<RootApp />);
