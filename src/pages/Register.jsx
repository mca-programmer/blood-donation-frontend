// src/pages/Register.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Register = () => {
  const { register, loading } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bloodGroup: "",
    district: "",
    upazila: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      await register(form);
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-400">
        <form
          onSubmit={handleSubmit}
          className="card p-8 shadow-lg w-full max-w-md space-y-4 bg-white rounded-lg"
        >
          <h2 className="text-2xl text-indigo-500 font-bold text-center">Register</h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <select
            name="bloodGroup"
            className="select select-bordered w-full"
            value={form.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>

          <input
            type="text"
            name="district"
            placeholder="District"
            className="input input-bordered w-full"
            value={form.district}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="upazila"
            placeholder="Upazila"
            className="input input-bordered w-full"
            value={form.upazila}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="avatar"
            placeholder="Avatar URL"
            className="input input-bordered w-full"
            value={form.avatar}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
