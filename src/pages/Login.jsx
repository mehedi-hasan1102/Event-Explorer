import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../Context/firebase/firebase.config";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const provider = new GoogleAuthProvider();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must contain at least one uppercase, one lowercase, and be at least 6 characters.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const resetPassword = () => {
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => toast.success("Password reset email sent!"))
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="p-0 m-0 flex justify-center items-center min-h-screen bg-gradient-to-tr from-blue-100 to-purple-200">
      <Helmet>
        <title>Login | Event Explorer</title>
      </Helmet>

      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-2xl rounded-xl overflow-hidden bg-white">
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img
            src="https://i.ibb.co/N2P0StjR/update.png"
            alt="Login Visual"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-sm space-y-4"
          >
            <h2 className="text-2xl font-bold text-center text-primary">Login</h2>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={resetPassword}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>

            <div className="divider">OR</div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full"
            >
              Continue with Google
            </button>

            <p className="text-sm text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
