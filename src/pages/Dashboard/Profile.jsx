// src/pages/Dashboard/Profile.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { axiosInstance, user } = useAuth();
  const [form, setForm] = useState(user);
  const [edit, setEdit] = useState(false);

  const handleSave = async () => {
    try {
      await axiosInstance.put(`/users/${user._id}`, form);
      setEdit(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-400">
        <div className="card max-w-xl mx-auto p-6 shadow-lg">
          <h2 className="text-2xl text-indigo-500 font-bold mb-4">Profile</h2>
          <button className="btn btn-sm btn-outline text-indigo-500 mb-4" onClick={() => setEdit(!edit)}>
            {edit ? "Cancel" : "Edit"}
          </button>
          <div className="space-y-4">
            <input type="text" value={form.name} 
                   onChange={(e) => setForm({ ...form, name: e.target.value })}
                   className="input input-bordered w-full" disabled={!edit} />
            <input type="email" value={form.email} className="input input-bordered w-full" disabled />
            <input type="text" value={form.district} 
                   onChange={(e) => setForm({ ...form, district: e.target.value })}
                   className="input input-bordered w-full" disabled={!edit} />
            <input type="text" value={form.upazila} 
                   onChange={(e) => setForm({ ...form, upazila: e.target.value })}
                   className="input input-bordered w-full" disabled={!edit} />
            <input type="text" value={form.bloodGroup} 
                   onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
                   className="input input-bordered w-full" disabled={!edit} />
          </div>
          {edit && <button className="btn btn-primary mt-4" onClick={handleSave}>Save</button>}
        </div>
      </main>
    </div>
  );
};

export default Profile;
