// src/pages/Dashboard/CreateDonationRequest.jsx
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";

const CreateDonationRequest = () => {
  const { axiosInstance, user } = useAuth();
  const [form, setForm] = useState({
    recipientName: "", recipientDistrict: "", recipientUpazila: "",
    hospitalName: "", fullAddress: "", bloodGroup: "", date: "", time: "", requestMessage: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/donation-requests", { ...form, requesterId: user._id });
      alert("Donation request created!");
      setForm({ recipientName: "", recipientDistrict: "", recipientUpazila: "", hospitalName: "", fullAddress: "", bloodGroup: "", date: "", time: "", requestMessage: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to create request");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-400 text-indigo-500">
        <h2 className="text-2xl font-bold mb-6">Create Donation Request</h2>
        <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
          <input type="text" value={user.name} disabled className="input input-bordered w-full" />
          <input type="email" value={user.email} disabled className="input input-bordered w-full" />
          <input type="text" placeholder="Recipient Name" value={form.recipientName} onChange={(e)=>setForm({...form, recipientName:e.target.value})} className="input input-bordered w-full" required/>
          <input type="text" placeholder="Recipient District" value={form.recipientDistrict} onChange={(e)=>setForm({...form, recipientDistrict:e.target.value})} className="input input-bordered w-full" required/>
          <input type="text" placeholder="Recipient Upazila" value={form.recipientUpazila} onChange={(e)=>setForm({...form, recipientUpazila:e.target.value})} className="input input-bordered w-full" required/>
          <input type="text" placeholder="Hospital Name" value={form.hospitalName} onChange={(e)=>setForm({...form, hospitalName:e.target.value})} className="input input-bordered w-full" required/>
          <input type="text" placeholder="Full Address" value={form.fullAddress} onChange={(e)=>setForm({...form, fullAddress:e.target.value})} className="input input-bordered w-full" required/>
          <select className="select select-bordered w-full" value={form.bloodGroup} onChange={(e)=>setForm({...form, bloodGroup:e.target.value})} required>
            <option value="">Select Blood Group</option>
            <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
            <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
          </select>
          <input type="date" value={form.date} onChange={(e)=>setForm({...form, date:e.target.value})} className="input input-bordered w-full" required/>
          <input type="time" value={form.time} onChange={(e)=>setForm({...form, time:e.target.value})} className="input input-bordered w-full" required/>
          <textarea placeholder="Request Message" value={form.requestMessage} onChange={(e)=>setForm({...form, requestMessage:e.target.value})} className="textarea textarea-bordered w-full" required/>
          <button type="submit" className="btn btn-primary w-full">Create Request</button>
        </form>
      </main>
    </div>
  );
};

export default CreateDonationRequest;
