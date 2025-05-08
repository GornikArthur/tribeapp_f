import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Likes from './pages/Likes';
import Search from './pages/Search';
import EditProfile from './pages/EditProfile';
import Authentication from './pages/AuthenticationCard';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function fetchUser() {
    try {
      const username = window.Telegram.WebApp.initDataUnsafe.user?.username;
      const res = await fetch(`https://miniature-space-adventure-xp4j79wp9grh674w-8000.app.github.dev/authentication/${username}`);
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (error) {
      console.error('Ошибка при получении пользователя:', error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Router>
      <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/search" replace /> : <Navigate to="/authentication" replace />} />

      <Route path="/authentication" element={isAuthenticated ? <Navigate to="/search" replace /> : <Authentication fetchAppUser={fetchUser} setIsAuthenticated={setIsAuthenticated} />} />
        
        <Route path="/edit" element={
          <ProtectedRoute user={user}>
            <EditProfile fetchAppUser={fetchUser}/>
          </ProtectedRoute>
        } />
        <Route path="/likes" element={
          <ProtectedRoute user={user}>
            <Likes />
          </ProtectedRoute>
        } />
        <Route path="/search" element={
          <ProtectedRoute user={user}>
            <Search />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
