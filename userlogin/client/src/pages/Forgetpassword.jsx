import React from 'react'
import { Link } from 'react-router-dom'
import "./style.css";
import Logo from "./logo.png"
const Forgetpassword = () => {
  return (
    <div className="parent" style={{ height: '70vh' }}>
    <div className="imagecontainer">
      <img src={Logo} alt="Gem" className="image"  />
      {/* <p className="content" style={{ fontSize: '10px' }}>Research | Broadcast</p> */}
    </div>
    <div className="container1" style={{width:'60%'}}>
      <div className="containerchild">
        <h4 className="content1">Don't have an account?</h4>
        <p className="content2">
          Let's get you all set up so you can start creating your <br /> first onboarding
          experience
        </p>
        <button className="login"><Link to="/signup">SIGN UP</Link></button>
      </div>
    </div>
    <div className="container2" >
      <div>
        <h4 className="signin">Forget Password</h4>
        <p className="para">
          Enter the email addrress associated  <br />
          with  account
        </p>
      </div>
      <div className="formcontainer" >
        <form >
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
            //   value={formdata.email}
            //   onChange={handleChange}
            />
          </div>
        
        
          <button type="submit" className="signup">SEND</button>
        </form>
        <p className='para'>Can you remember your password</p>
        <Link to="/logedin" style={{color:'skyblue'}}>Login Now</Link>
      </div>
    </div>


  </div>
  )
}

export default Forgetpassword