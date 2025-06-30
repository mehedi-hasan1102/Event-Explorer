import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Context/firebase/firebase.config";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const provider = new GoogleAuthProvider();

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must contain at least one uppercase, one lowercase, and be at least 6 characters.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed up with Google!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <Helmet>
        <title>Sign Up | Event Explorer</title>
      </Helmet>

      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white/90 backdrop-blur-xl shadow-xl rounded-xl overflow-hidden">
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img
            src="https://i.ibb.co/dwhGH79W/log0in.jpg"
            alt="Signup Visual"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
          <form onSubmit={handleSignup} className="w-full max-w-sm space-y-5">
            <h2 className="text-3xl font-bold text-center text-blue-600">Create Account</h2>
            <p className="text-sm text-center text-gray-500">Sign up to get started</p>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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

            <button type="submit" className="btn btn-primary w-full">
              Sign Up
            </button>

            <div className="divider text-xs">OR</div>

            <button
              type="button"
              onClick={handleGoogleSignup}
              className="btn btn-outline w-full"
            >
              Continue with Google
            </button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
