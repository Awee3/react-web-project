import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import user_icon from '../assets/LoginSignup/person.png';
import email_icon from '../assets/LoginSignup/email.png';
import password_icon from '../assets/LoginSignup/password.png';
import phone_icon from '../assets/LoginSignup/phone2.png';

const LoginComp = () => {
  const [action, setAction] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // State for phone number
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleActionClick = async () => {
    if ((action === "Sign Up" && !name) || !email || !password || (action === "Sign Up" && !phone)) { 
      setWarning("All fields are required");
      return;
    }

    setWarning("");
    try {
      if (action === "Login") {
        const response = await axios.post('http://localhost:5000/login', {
          email,
          password,
        });
        if (response.status === 200) {
          setLoggedInUser(response.data);
          navigate("/main");
        }
      } else {
        const response = await axios.post('http://localhost:5000/signup', {
          name,
          email,
          password,
          phone, 
        });
        if (response.status === 201) {
          setAction("Login");
        }
      }
    } catch (error) {
      setWarning(error.response.data.message || "Server error");
    }
  };

  return (
    <div className='containerLogin min-vh-100'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? null : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type='email'
            placeholder='Email Id'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {action === "Sign Up" && ( 
          <div className="input">
            <img src={phone_icon} alt="" />
            <input
              type='text'
              placeholder='Phone Number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}
        {warning && <div className="warning">{warning}</div>}
      </div>
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit black"}
          onClick={() => {
            setAction("Sign Up");
            setWarning(""); 
          }}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit black"}
          onClick={() => {
            setAction("Login");
            setWarning(""); 
          }}
        >
          Login
        </div>
        <div
          className="submit"
          onClick={handleActionClick}
        >
          {action}
        </div>
      </div>
    </div>
  );
};

export default LoginComp;
