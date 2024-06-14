import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "./logo.png";
import { useUser } from "./UserContext"; // Ensure correct path

const Login = () => {
  const { updateUser } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', formData);
      alert('Login successful!');
      console.log(res.data);
      const { token, user } = res.data;
      console.log(user.email);
      updateUser({
        email: user.email,
        username: user.name,
        token: token,
      });
      localStorage.setItem('userData', JSON.stringify({ email: user.email, username: user.name, token: token }));
      window.location.replace('/profile'); 
    } catch (err) {
      alert('Login failed!');
      console.error(err);
    }
  };

  return (
    <div className="parent" style={{ height: '80vh' }}>
      <div className="imagecontainer">
        <img src={Logo} alt="Gem" className="image" />
      </div>
      <div className="container2">
        <div>
          <h4 className="signin">Log in to your Account</h4>
          <p className="para">
            Log in to your account so you can continue your <br />
            boarding flows
          </p>
        </div>
        <div className="formcontainer">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group1" style={{ gap: '10px' }}>
              <input
                type="checkbox"
                name="termsAccepted"
              />
              <label>Remember Me</label>
              <Link to="/forgetpassword">Forgot password</Link>
            </div>
            <button type="submit" className="signup">LOGIN</button>
          </form>
        </div>
      </div>

      <div className="container1">
        <div className="containerchild">
          <h4 className="content1">Don`t have an account?</h4>
          <p className="content2">
            Let`s get you all set up so you can start creating your <br /> first onboarding
            experience
          </p>
          <button className="login"><Link to="/signup">SIGN UP</Link></button>
        </div>
      </div>
    </div>
  );
};

export default Login;
