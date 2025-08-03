import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
// import Dashboard from './pages/Dashboard';

import Layout from './Layout';
import ProtectedRoute from './components/ProtectedRoute';
import SessionEditor from './pages/SessionEditor';
import Dashboard from './pages/Dashboard';
import MySession from './pages/MySessions';
import Profile from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected Routes inside Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-session" element={<SessionEditor />} />
          <Route path="my-sessions" element={<MySession />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/editor" element={<SessionEditor />} />
          <Route path="/editor/:id" element={<SessionEditor />} />

        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
