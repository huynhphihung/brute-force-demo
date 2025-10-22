import React from "react";
import { useAuthStore } from "../stores/auth.store";

const Home = () => {
  const { signout } = useAuthStore();
  const handleLogout = () => {
    signout();
  };
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is a protected route that only authenticated users can access.</p>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Home;
