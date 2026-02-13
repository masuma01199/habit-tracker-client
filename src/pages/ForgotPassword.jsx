import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { resetPassword } = useContext(AuthContext);

  const handleReset = (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    resetPassword(email)
      .then(() => {
        toast.success("Reset link sent! Check your inbox.");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10 text-center">
        <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">🔑</span>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
        <p className="text-gray-500 mb-8">Enter your email and we'll send you a link to get back into your account.</p>

        <form onSubmit={handleReset} className="space-y-6 text-left">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              required
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
          >
            Send Reset Link →
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-500">
          Remembered it? <Link to="/login" className="text-indigo-600 font-bold no-underline">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};


export default ForgotPassword;