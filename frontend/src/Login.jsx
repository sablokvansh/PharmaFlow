import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import glass from "./glass.jpg";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const [message, setmessage] = useState("");
  const [success, setSuccess] = useState(false);

  // --- Backend Login API ---
  const loginAPI = async () => {
    try {
      const result = await axios.post(
        "https://pharma-flow-nine.vercel.app/auth/login",
        formdata,
        { withCredentials: true }
      );

      console.log("✅ Login Response:", result.data);
      const userData = result.data.user;

      // ✅ Store login info in localStorage
      if (result.data && result.data.user) {
  // Store login info in localStorage
  localStorage.setItem("userEmail", result.data.user.email);
  localStorage.setItem("userData", JSON.stringify(result.data.user));

  setSuccess(true);
  setmessage("");

  // Navigate based on role or email
  if (formdata.email === "admin@gmail.com") {
    setTimeout(() => {
      navigate("/admin/dashboard");
    }, 1500);
  } else {
    setTimeout(() => {
      navigate("/home");
    }, 1500);
  }
}
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data || err.message);
      setmessage(err.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!formdata.email || !formdata.password) {
      setmessage("Please fill all the fields");
    } else {
      await loginAPI();
      setformdata({ email: "", password: "" });
    }
  };

  return (
    <div className="login-container">
      {success && <div className="toast-success">✅ Login Successful! Redirecting...</div>}

      {/* Left Section */}
      <div className="login-left">
        <img src={glass} alt="Login Visual" className="img" />
        <div className="login-overlay-text">
          <h2 className="join">Welcome Back</h2>
          <p className="step">Log in to continue your journey</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="login-right">
        <form className="login-form" onSubmit={handlesubmit}>
          <h3 className="login-title">Login Form</h3>

          {message && <p className="error-text">{message}</p>}

          <label style={{ color: "white" }}>Enter your email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formdata.email}
            onChange={handlechange}
            required
          />

          <label style={{ color: "white" }}>Enter your password</label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formdata.password}
            onChange={handlechange}
            required
          />

          <button type="submit">Submit</button>

          <p className="signup-text">
            New user?{" "}
            <Link className="link2" to="/sign-up">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
