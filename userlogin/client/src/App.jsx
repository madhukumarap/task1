import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import Signup from './pages/Signup'
import Logedin from "./pages/Login"
import Forgetpassword from './pages/Forgetpassword';
import Profile from './pages/Profile';
// import { UserProvider } from './pages/UserContext'; 
function App() {

  return (
  
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logedin" element={<Logedin />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
        <Route path="/" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
   
  )
}

export default App
