import React from "react";
import "./style.css";

const Signup = () => {
  return (
    <div className="parent">
      <div className="parent">
        <div className="container1">
          <div className="imagecontainer">
            <img src="" alt="Gem" className="image" />
            <p className="content">Research | Broadcast</p>
          </div>
          <div className="containerchild">
            <h4 className="content1">Already have an account?</h4>
            <p className="content2">
              Log in to your account so you can continue your <br /> boarding
              flows
            </p>
            <button className="login">LOGIN NOW</button>
          </div>
        </div>
      </div>

      <div className="container2">
        <h1>Sign Up for an Account</h1>
        <p>
          Lets get you all set up so you can start creating your <br />
          first onboarding experience
        </p>
        <div>
          <form>
            <div className="form-group">
              <label>Media outlet</label>
              <input type="text" placeholder="Enter media outlet" />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Enter the name" />
            </div>
            <div className="form-group">
              <label>Job Title</label>
              <input type="text" placeholder="Enter job title" />
            </div>
            <div className="form-group">
              <label>Web Address</label>
              <input type="text" placeholder="Enter web address" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="text" placeholder="Enter email address" />
            </div>
            <div className="form-group">
              <input type="checkbox" />
              <label>Agree to terms and condition</label>
            </div>
            <button className="signup">SIGN UP</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
