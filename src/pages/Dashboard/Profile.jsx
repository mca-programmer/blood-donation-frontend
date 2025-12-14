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
    // Reset form to original user data
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
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 text-gray-600">
        <div className="card max-w-xl mx-auto p-6 shadow-lg bg-white">
          <h2 className="text-2xl text-red-600 text-center font-bold mb-4">My Profile</h2>

          <div className="flex justify-between items-center mb-4">
            {!edit ? (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => setEdit(true)}
              >
                Edit Profile
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  className="btn btn-sm btn-success"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4 text-gray-500">
            {/* Avatar */}
            <div>
              <label className="label">
                <span className="label-text">Avatar URL</span>
              </label>
              <input
                type="text"
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                className="input input-bordered w-full"
                disabled={!edit}
                placeholder="Enter image URL"
              />
              {form.avatar && (
                <div className="mt-2">
                  <img
                    src={form.avatar}
                    alt="Avatar preview"
                    className="w-20 h-20 rounded-full object-cover"
                    onError={(e) => (e.target.src = "/default-avatar.png")}
                  />
                </div>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input input-bordered w-full"
                disabled={!edit}
              />
            </div>

            {/* Email (Read Only) */}
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={form.email}
                className="input input-bordered w-full "
                disabled
              />
              <label className="label">
                <span className="label-text-alt">
                  Email cannot be changed
                </span>
              </label>
            </div>

            {/* Blood Group */}
            <div>
              <label className="label">
                <span className="label-text">Blood Group</span>
              </label>
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
                  className="input input-bordered w-full"
                  disabled
                />
              )}
            </div>

            {/* District */}
            <div>
              <label className="label">
                <span className="label-text">District</span>
              </label>
              <input
                type="text"
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                className="input input-bordered w-full"
                disabled={!edit}
                placeholder="e.g. Dhaka"
              />
            </div>

            {/* Upazila */}
            <div>
              <label className="label">
                <span className="label-text">Upazila</span>
              </label>
              <input
                type="text"
                value={form.upazila}
                onChange={(e) => setForm({ ...form, upazila: e.target.value })}
                className="input input-bordered w-full"
                disabled={!edit}
                placeholder="e.g. Mirpur"
              />
            </div>

            {/* Role (Read Only) */}
            <div>
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <input
                type="text"
                value={user?.role || "donor"}
                className="input input-bordered w-full"
                disabled
              />
            </div>

            {/* Status (Read Only) */}
            <div>
              <label className="label">
                <span className="label-text">Account Status</span>
              </label>
              <input
                type="text"
                value={user?.status || "active"}
                className={`input text-gray-800 text-center input-bordered w-full ${
                  user?.status === "active" ? "bg-green-500" : "bg-red-50"
                }`}
                disabled
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
