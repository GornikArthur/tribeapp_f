import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Likes from './pages/Likes';
import Search from './pages/Search';
import EditProfile from './pages/EditProfile';
import Authentication from './pages/AuthenticationCard';
import ProtectedRoute from './pages/ProtectedRoute';
import { retrieveLaunchParams } from '@telegram-apps/sdk';

function App() {
  const [user, setUser] = useState(null);

  async function fetchUser() {
    try {
      const { initDataRaw } = retrieveLaunchParams();
      console.log("Telegram user:", initDataRaw);
      if (!tg_user) {
        console.error("Telegram user info not available");
        return;
      }
      console.error(username);
      
      /*const res = await fetch(`https://miniature-space-adventure-xp4j79wp9grh674w-8000.app.github.dev/authentication/${tg_user.id}`);
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }*/
    } catch (error) {
      console.error('Ошибка при получении пользователя:', error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    /*
    <Router>
      <Routes>
      <Route path="/" element={user ? <Navigate to="/search" replace /> : <Navigate to="/authentication" replace />} />

      <Route path="/authentication" element={user ? <Navigate to="/search" replace /> : <Authentication fetchAppUser={fetchUser} />} />
        
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
    </Router> */
    <></>
  );
}

export default App;
