import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import glassVideo from "./glassVideo.mp4";
import "./SignUp.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    pctean: "",
  });

  const [message, setmessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false); // ✅ for success popup

  const signupAPI = async () => {
    try {
      const result = await axios.post("https://pharma-flow-nine.vercel.app/auth/signup", formdata, {
        withCredentials: true,
      });

      console.log("✅ Signup Success:", result.data);

      if (result.status === 201) {
        setSuccess(true); // ✅ show popup
        setmessage("");
        setTimeout(() => {
          setSuccess(false);
          navigate("/"); // redirect after 2 sec
        }, 2000);
      }
    } catch (err) {
      console.error("❌ Signup Error:", err.response?.data || err.message);
      setmessage(err.response?.data?.message || "Something went wrong");
    }
  };

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!formdata.email || !formdata.password) {
      setmessage("Please fill all the fields");
    } else if (formdata.password !== formdata.confirmPassword) {
      setConfirmPassword("Passwords do not match");
    } else {
      setConfirmPassword("");
      await signupAPI();
      setformdata({
        email: "",
        password: "",
        confirmPassword: "",
        pctean: "",
      });
    }
  };

  return (
    <div className="signup-container">
      {/* ✅ Success Toast */}
      {success && (
        <div className="toast-success">
          🎉 Signup successful! Redirecting...
        </div>
      )}

      {/* Left side with video and text */}
      <div className="signup-left">
        <video
          src={glassVideo}
          autoPlay
          loop
          muted
          className="signup-image"
        />
        <div className="signup-overlay-text">
          <h1 className="join">Let’s get started!</h1>
        </div>
      </div>

      {/* Right side with form */}
      <div className="signup-right">
        <form className="signup-form" onSubmit={handlesubmit}>
          <h2 className="signup-title">Signup Form</h2>

          {message && <p className="error-message">{message}</p>}

          <label>Enter your email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formdata.email}
            onChange={handlechange}
            required
          />

          <label>Set your password</label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formdata.password}
            onChange={handlechange}
            required
          />

          <label>Confirm your password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formdata.confirmPassword}
            onChange={handlechange}
            required
          />
          {formdata.confirmPassword && (
            <p className="con-pass">{confirmPassword}</p>
          )}

          <button type="submit">Submit</button>

          <p className="login-text">
            Already have an account?{" "}
            <Link className="link2" to="/">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
