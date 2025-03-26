import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputField from "../reusable/InputField/InputField";
import styles from "./Login.module.css";

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

    const updatedLoginDetails = loginDetails.map((field) => {
      const validationMessage = field.validation(field.value);
      if (validationMessage !== true) {
        newErrors[field.name] = validationMessage;
        isValid = false;
      }
      if (field.name === "username") username = field.value;
      return field;
    });

    setErrors(newErrors);
    if (!isValid) return;

    console.log("Logging in...", updatedLoginDetails);
    navigate("/home", { state: { username } }); // Navigate with username
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Login</h2>
        {loginDetails.map((field, i) => (
          <div key={i} className={styles.inputWrapper}>
            <div style={{ width: "100%", position: "relative" }}>
              <InputField
                type={field.name === "password" && showPassword ? "text" : field.type}
                placeholder={field.placeholder}
                name={field.name}
                value={field.value}
                onChange={changeHandler}
              />
              {field.name === "password" && (
                <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              )}
            </div>
            {errors[field.name] && <p className={styles.error}>{errors[field.name]}</p>}
          </div>
        ))}
        <button className={styles.loginButton} onClick={handleLogin}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
