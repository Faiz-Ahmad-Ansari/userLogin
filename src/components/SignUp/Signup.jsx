import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signUpStyles from "./Signup.module.css";
import loginStyles from '../Login/Login.module.css'
import InputField from "../reusable/InputField/InputField";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const SignUp = () => {
    const navigate = useNavigate();
    const [signUpDetails, setSignUpDetails] = useState([
      {
        name: "firstName",
        value: "",
        type: "text",
        placeholder: "First Name",
        validation: (val) => val.trim().length > 0 || "First Name is required.",
      },
      {
        name: "lastName",
        value: "",
        type: "text",
        placeholder: "Last Name",
        validation: (val) => val.trim().length > 0 || "Last Name is required.",
      },
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
      setSignUpDetails((prev) =>
        prev.map((field) => (field.name === name ? { ...field, value } : field))
      );
      setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
      };
    
  
    const handleSignUp = () => {
      let newErrors = {};
      let isValid = true;
  
      signUpDetails.forEach((field) => {
        const validationMessage = field.validation(field.value);
        if (validationMessage !== true) {
          newErrors[field.name] = validationMessage;
          isValid = false;
        }
      });
  
      setErrors(newErrors);
      if (!isValid) return;
  
      localStorage.setItem("user", JSON.stringify(signUpDetails));
      navigate("/");
    };
  
    return (
        <div className={signUpStyles.container}>
          <div className={signUpStyles.signUpBox}>
            <h2 className={signUpStyles.title}>Sign Up</h2>
            {signUpDetails.map((field, i) => (
              <div key={i} className={signUpStyles.inputWrapper}>
                <div style={{ width: "100%", position: "relative" }}>
                <InputField
                  type={field.name === "password" && showPassword ? "text" : field.type}
                  name={field.name}
                  placeholder={field.placeholder}
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
            {/* {Object.values(errors).map((err, i) => (
              <p key={i} className={signUpStyles.error}>{err}</p>
            ))} */}
            <button className={signUpStyles.signUpButton} onClick={handleSignUp}>Sign Up</button>
            <button className={loginStyles.loginButton} onClick={() => navigate("/")}>
                 Log In
            </button>
          </div>
        </div>
      );
  };

  export default SignUp