import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginDetails: [
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
  ],
  errors: {},
  showPassword: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { name, value } = action.payload;
      state.loginDetails = state.loginDetails.map((field) =>
        field.name === name ? { ...field, value } : field
      );
      state.errors[name] = ""; // Clear error on input change
    },
    validateFields: (state) => {
      let newErrors = {};
      let isValid = true;

      state.loginDetails.forEach((field) => {
        const validationMessage = field.validation(field.value);
        if (validationMessage !== true) {
          newErrors[field.name] = validationMessage;
          isValid = false;
        }
      });

      state.errors = newErrors;
      return isValid;
    },
    togglePassword: (state) => {
      state.showPassword = !state.showPassword;
    },
  },
});

export const { updateField, validateFields, togglePassword } = authSlice.actions;
export default authSlice.reducer;
