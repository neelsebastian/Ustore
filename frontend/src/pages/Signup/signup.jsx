import Navbar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [buttonText, setButtonText] = useState('Create account');

  const onHandleChange = e => {
    const { name, value } = e.target;
    setSignupData(prevData => ({ ...prevData, [name]: value }));
  };

  const onHandleSubmit = async e => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const res = await axios.post(
        'http://localhost:8000/user/sign-up',
        signupData
      );
      setButtonText('Account created');
      setTimeout(() => navigate('/login'), 800);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };
  return (
    <div className="signup">
      <Navbar />
      <div className="signup-container">
        <h1>Sign Up</h1>
        <div className="signup-name">
          <input
            type="text"
            name="firstname"
            placeholder="First name"
            value={signupData.firstname}
            className="signup-firstname"
            onChange={onHandleChange}
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last name"
            className="signup-lastname"
            value={signupData.lastname}
            onChange={onHandleChange}
            required
          />
        </div>
        <input
          type="text"
          placeholder="Enter email"
          className="signup-email"
          name="email"
          value={signupData.email}
          onChange={onHandleChange}
          required
        />
        <div className="signup-password">
          <input
            type="password"
            placeholder="Create password"
            name="password"
            value={signupData.password}
            onChange={onHandleChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={signupData.confirmPassword}
            onChange={onHandleChange}
            required
          />
        </div>
        <div className="signup-input2">
          <input type="checkbox" />
          <label>
            I confirm that I have read and agree to <span>Privacy Policy</span>
          </label>
        </div>
        <button className="signup-btn" onClick={onHandleSubmit}>
          {buttonText}
        </button>
        <p className="signup-lower-signup">
          Already have an account?{' '}
          <span className="signup-redirect">
            <Link to="/login">Login in</Link>
          </span>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
