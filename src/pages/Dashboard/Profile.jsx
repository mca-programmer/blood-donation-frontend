// src/pages/Dashboard/Profile.jsx
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    district: user?.district || "",
    upazila: user?.upazila || "",
    bloodGroup: user?.bloodGroup || "",
    avatar: user?.avatar || "",
  });
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile({
        name: form.name,
        district: form.district,
        upazila: form.upazila,
        bloodGroup: form.bloodGroup,
        avatar: form.avatar,
      });
      setEdit(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      district: user?.district || "",
      upazila: user?.upazila || "",
      bloodGroup: user?.bloodGroup || "",
      avatar: user?.avatar || "",
    });
    setEdit(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-red-50 via-red-100 to-white p-6 rounded-3xl shadow-xl transform transition hover:scale-105">
          <h2 className="text-3xl font-bold text-red-600 text-center mb-6">
            My Profile
          </h2>

          {/* Edit / Save Buttons */}
          <div className="flex justify-end mb-6">
            {!edit ? (
              <button
                className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                onClick={() => setEdit(true)}
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  className="btn btn-sm btn-outline hover:text-white text-gray-800"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            {form.avatar ? (
              <img
                src={form.avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover shadow-md"
                onError={(e) => (e.target.src = "/default-avatar.png")}
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center text-3xl font-bold shadow-md">
                {form.name ? form.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}
            {edit && (
              <input
                type="text"
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                placeholder="Avatar URL"
                className="mt-3 input input-bordered w-full text-gray-100"
              />
            )}
          </div>

          {/* Profile Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-100">
            {/* Name */}
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input input-bordered w-full"
                disabled={!edit}
              />
            </div>

            {/* Email */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                value={form.email}
                disabled
                className="input input-bordered w-full bg-gray-600"
              />
              <span className="text-xs text-gray-500">Cannot change email</span>
            </div>

            {/* Blood Group */}
            <div>
              <label className="label">Blood Group</label>
              {edit ? (
                <select
                  className="select select-bordered w-full"
                  value={form.bloodGroup}
                  onChange={(e) =>
                    setForm({ ...form, bloodGroup: e.target.value })
                  }
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
              ) : (
                <input
                  type="text"
                  value={form.bloodGroup}
                  disabled
                  className="input input-bordered w-full"
                />
              )}
            </div>

            {/* District */}
            <div>
              <label className="label">District</label>
              <input
                type="text"
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                className="input input-bordered w-full"
                disabled={!edit}
              />
            </div>

            {/* Upazila */}
            <div>
              <label className="label">Upazila</label>
              <input
                type="text"
                value={form.upazila}
                onChange={(e) => setForm({ ...form, upazila: e.target.value })}
                className="input input-bordered w-full"
                disabled={!edit}
              />
            </div>

            {/* Role */}
            <div>
              <label className="label">Role</label>
              <input
                type="text"
                value={user?.role || "donor"}
                disabled
                className="input input-bordered w-full bg-gray-600"
              />
            </div>

            {/* Status */}
            <div>
              <label className="label">Account Status</label>
              <input
                type="text"
                value={user?.status || "active"}
                disabled
                className={`input text-center w-full ${
                  user?.status === "active"
                    ? "bg-green-500 text-white"
                    : "bg-red-100 text-red-600"
                }`}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
