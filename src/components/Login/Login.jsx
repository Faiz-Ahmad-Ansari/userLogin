import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputField from "../reusable/InputField/InputField";
import loginStyles from "./Login.module.css";
import signUpStyles from "../SignUp/Signup.module.css";

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [loginDetails, setLoginDetails] = useState([
    {
      name: "username",
      value: "",
      type: "text",
      placeholder: "Username",
      validation: (val) => val.trim().length > 0 || "Username is required.",
    },
    {
      name: "password",
      value: "",
      type: "password",
      placeholder: "Password",
      validation: (val) =>
        val.length >= 6 && /\d/.test(val)
          ? true
          : "Password must be at least 6 characters long and contain a number.",
    },
  ]);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev) =>
      prev.map((field) => (field.name === name ? { ...field, value } : field))
    );
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error when typing
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = () => {
    let newErrors = {};
    let isValid = true;
    let username = "";
    let password = "";

    loginDetails.forEach((field) => {
      const validationMessage = field.validation(field.value);
      if (validationMessage !== true) {
        newErrors[field.name] = validationMessage;
        isValid = false;
      }
      if (field.name === "username") username = field.value;
      if (field.name === "password") password = field.value;
    });

    setErrors(newErrors);
    if (!isValid) return;

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.find(f => f.name === "username").value !== username || storedUser.find(f => f.name === "password").value !== password) {
      setErrors((prev) => ({ ...prev, general: "User not available" }));
      return;
    }

    console.log("Logging in...", loginDetails);
    navigate("/home", { state: { username } }); // Navigate with username
  };

  return (
    <div className={loginStyles.container}>
      <div className={loginStyles.loginBox}>
        <h2 className={loginStyles.title}>Login</h2>
        {loginDetails.map((field, i) => (
          <div key={i} className={loginStyles.inputWrapper}>
            <div style={{ width: "100%", position: "relative" }}>
              <InputField
                type={field.name === "password" && showPassword ? "text" : field.type}
                placeholder={field.placeholder}
                name={field.name}
                value={field.value}
                onChange={changeHandler}
              />
              {field.name === "password" && (
                <span className={loginStyles.eyeIcon} onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              )}
            </div>
            {errors[field.name] && <p className={loginStyles.error}>{errors[field.name]}</p>}
          </div>
        ))}
        {errors.general && <p className={loginStyles.error}>{errors.general}</p>}
        <button className={loginStyles.loginButton} onClick={handleLogin}>
          Log In
        </button>
        <button className={signUpStyles.signUpButton} onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;