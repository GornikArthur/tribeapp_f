import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Likes from './pages/Likes';
import Search from './pages/Search';
import EditProfile from './pages/EditProfile';
import Authentication from './pages/AuthenticationCard';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);

  async function fetchUser() {
    if (WebApp?.initDataUnsafe?.user) {
      setUser(WebApp.initDataUnsafe.user);
    } else {
      console.warn('Пользователь не найден в Telegram WebApp');
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <h1>{user.username}</h1>
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
  );
}

export default App;
