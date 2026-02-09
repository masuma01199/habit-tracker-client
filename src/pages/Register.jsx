import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, googleLogin, updateProfile } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    // 🔐 Password Validation
    if (!/(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
      toast.error(
        "Password must have uppercase, lowercase and at least 6 characters"
      );
      return;
    }

    try {
      const result = await createUser(email, password);

      await updateProfile(result.user, {
        displayName: name,
        photoURL: photo,
      });

      toast.success("Registration successful");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2>Create an Account</h2>

      <form onSubmit={handleRegister}>
        <input name="name" placeholder="Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="photo" placeholder="Photo URL" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />

        <button type="submit">Register</button>
      </form>

      <button onClick={handleGoogleRegister}>
        Continue with Google
      </button>

      <p>
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;