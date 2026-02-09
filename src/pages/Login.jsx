import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      toast.success("Login successful");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Login to Habit Tracker</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>

      <br />

      <button onClick={handleGoogleLogin}>
        Continue with Google
      </button>

      <p>
        New here? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
};

export default Login;