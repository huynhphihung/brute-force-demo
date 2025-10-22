import React from "react";
import { useAuthStore } from "../stores/auth.store";

const Signup = () => {
  const { signup } = useAuthStore();

  const handleSignup = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");
    signup({ username, password });
  };
  return (
    <div className="signup-page">
      <h1>Create an Account</h1>
      <form className="signup-form" onSubmit={handleSignup}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
