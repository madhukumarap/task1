import  { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import Profile from './Profile';
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:5000/";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm setLoggedIn={setLoggedIn} />} />
        <Route path="/profile" element={loggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
