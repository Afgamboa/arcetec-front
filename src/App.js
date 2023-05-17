import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import  Login  from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import Register from './components/Register'


export const isAuthenticated = () => {
  const user = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  if(user && token) return true;
  else return false;
};

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/profile" Component={Profile} />
          <Route path="/home" element={isAuthenticated() ? (<Home />): <Navigate to={'/'} />} />
        </Routes>
      </Router>
    );
}

export default App;
