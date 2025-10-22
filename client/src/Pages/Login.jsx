import { useAuthStore } from "../stores/auth.store";

const Login = () => {
  const { login } = useAuthStore();
  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    login({ username, password });
  };
  return (
    <div className="login-page">
      <h1>Welcome back</h1>
      <form className="login-form" onSubmit={handleLogin}>
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

export default Login;
