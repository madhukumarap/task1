import { useState } from 'react';
import axios from 'axios';
import './style.css';
import { Link } from 'react-router-dom';
import Logo from "./logo.png"
const Signup = () => {
  const [signupData, setSignupData] = useState({
    mediaOutlet: '',
    name: '',
    jobTitle: '',
    webAddress: '',
    email: '',
    password: '',
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData({
      ...signupData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signupData.termsAccepted) {
      alert('Please accept the terms and conditions');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/register', signupData);
      alert('Registration successful!');
      console.log(res.data)
      window.location.replace('./logedin')
    } catch (err) {
      alert('Registration failed!');
      console.error(err);
    }
  };

  return (
    <div className="parent" style={{height:'120vh'}}>
      <div className="imagecontainer">
        <img src={Logo} alt="Gem" className="image" />
        
      </div>
      <div className="container1">
        <div className="containerchild">
          <h4 className="content1">Already have an account?</h4>
          <p className="content2">
            Log in to your account so you can continue your <br /> boarding flows
          </p>
          <Link to="/logedin"> <button className="login">LOGIN NOW</button></Link>
        </div>
      </div>

      <div className="container2">
        <h4 className="signin">Sign Up for an Account</h4>
        <p className="para">
          Let`s get you all set up so you can start creating your <br />
          first onboarding experience
        </p>
        <div className="formcontainer">
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label>Media outlet</label>
              <input
                type="text"
                name="mediaOutlet"
                placeholder="Enter media outlet"
                value={signupData.mediaOutlet}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter the name"
                value={signupData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                name="jobTitle"
                placeholder="Enter job title"
                value={signupData.jobTitle}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Web Address</label>
              <input
                type="text"
                name="webAddress"
                placeholder="Enter web address"
                value={signupData.webAddress}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={signupData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={signupData.password}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group1">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={signupData.termsAccepted}
                onChange={handleChange}
              />
              <label>Agree to <span>terms and conditions</span></label>
            </div>
            <button className="signup" type="submit">SIGN UP</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
