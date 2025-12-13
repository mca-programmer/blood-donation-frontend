import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FcGoogle } from "react-icons/fc";

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

  return (
    <div>
      <Navbar />
      <div className="flex justify-center bg-gray-400 items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="card p-8 shadow-lg w-full max-w-md space-y-4 bg-white"
        >
          <h2 className="text-2xl font-bold text-red-500 text-center">Login</h2>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {/* Login Button */}
          <button className="btn btn-primary w-full" disabled={loading}>
            Login
          </button>

          {/* OR Divider */}
          <div className="text-center text-red-400 my-2">OR</div>

          {/* Google Login Button */}
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
            <Link to="/register" className="text-red-500">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
