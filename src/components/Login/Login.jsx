import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons
import InputField from "../reusable/InputField/InputField";
import styles from "./Login.module.css";

const Login = () => {
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

    const updatedLoginDetails = loginDetails.map((field) => {
      const validationMessage = field.validation(field.value);
      if (validationMessage !== true) {
        newErrors[field.name] = validationMessage;
        isValid = false;
      }
      return field;
    });

    setErrors(newErrors);
    if (!isValid) return;

    console.log("Logging in...", updatedLoginDetails);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Login</h2>
        {loginDetails.map((field, i) => (
          <div key={i} className={styles.inputWrapper}>
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
