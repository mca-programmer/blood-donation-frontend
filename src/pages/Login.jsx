import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FcGoogle } from "react-icons/fc";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const Login = () => {
  const { login, loginWithGoogle, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
    } catch (err) {
      alert("Login failed: " + (err.message || "Unknown error"));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      alert("Google Login failed: " + (err.message || "Unknown error"));
    }
  };

  // ✅ Show loader when auth is loading
  if (loading) {
    return <Loading text="Logging you in..." />;
  }

  return (
    <div>
      <Navbar />

      <div className="flex justify-center bg-gray-50 items-center min-h-screen container mx-auto px-4">
        <form
          onSubmit={handleSubmit}
          className="card p-8 shadow-xl w-full max-w-md space-y-4 bg-white rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-red-500 text-center">
            BloodDonate Login
          </h2>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {/* Login */}
          <button
            className="btn btn-primary w-full hover:bg-red-600"
            disabled={loading}
          >
            Login
          </button>

          <div className="text-center text-red-400 my-2">OR</div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-outline text-red-400 w-full flex justify-center items-center gap-2"
            disabled={loading}
          >
            <FcGoogle /> Login with Google
          </button>

          <p className="text-center text-red-400 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
