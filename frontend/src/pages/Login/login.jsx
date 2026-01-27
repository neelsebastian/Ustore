import Navbar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const onHandleChange = e => {
    const { name, value } = e.target;
    setLoginData(prevData => ({ ...prevData, [name]: value }));
  };

  const onHandleSubmit = async e => {
    try {
      const res = await axios.post(
        'http://localhost:8000/user/login',
        loginData
      );
      localStorage.setItem('userId', res.data.user._id);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('firstname', res.data.user.firstname);
      navigate('/');
    } catch (err) {
      console.log({ message: err.message });
    }
  };

  return (
    <div className="login">
      <Navbar />
      <div className="login-container">
        <h1>Welcome back</h1>
        <div className="login-input1 login-email">
          <i class="fa-solid fa-envelope"></i>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            value={loginData.email}
            onChange={onHandleChange}
            required
          />
        </div>
        <div className="login-input1">
          <i class="fa-solid fa-lock"></i>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={onHandleChange}
            required
          />
        </div>
        <div className="login-input2">
          <div className="remember-check">
            <input type="checkbox" />
            <label>Remember me</label>
          </div>
          <p>Forgot password?</p>
        </div>
        <button className="login-btn" onClick={onHandleSubmit}>
          Login
        </button>
        <p className="login-lower-signup">
          New to UStore?{' '}
          <span className="login-redirect">
            <Link to="/signup">Sign up </Link>
          </span>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
