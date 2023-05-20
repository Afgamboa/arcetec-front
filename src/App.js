import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import  Login  from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import Register from './components/Register'
import { isExpired } from "react-jwt";

export const isAuthenticated = () => {
  const user = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const tokenExpired = isExpired(token);
  if(user && token && !tokenExpired) return true;
  else return false;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/profile" element={isAuthenticated() ? (<Profile />): <Navigate to={'/'} />} />
        <Route path="/home" element={isAuthenticated() ? (<Home />): <Navigate to={'/'} />} />
      </Routes>
    </Router>
  );
}

export default App;
