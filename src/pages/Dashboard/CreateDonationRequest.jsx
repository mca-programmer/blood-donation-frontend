// src/pages/Dashboard/CreateDonationRequest.jsx
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";

const CreateDonationRequest = () => {
  const { axiosInstance, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    date: "",
    time: "",
    requestMessage: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ব্যাকএন্ড automatically requesterName আর requesterEmail সেট করবে
      await axiosInstance.post("/donation-requests", form);
      alert("Donation request created successfully!");
      
      // ফর্ম রিসেট করো
      setForm({
        recipientName: "",
        recipientDistrict: "",
        recipientUpazila: "",
        hospitalName: "",
        fullAddress: "",
        bloodGroup: "",
        date: "",
        time: "",
        requestMessage: ""
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 text-gray-400">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">Create Donation Request</h2>
        <form onSubmit={handleSubmit} className="max-w-xl bg-white p-6 rounded-lg shadow space-y-4">
          
          {/* Requester Info (Read Only) */}
          <div>
            <label className="label">Requester Name</label>
            <input 
              type="text" 
              value={user?.name || ""} 
              disabled 
              className="input input-bordered w-full text-gray-600 bg-gray-100" 
            />
          </div>
          
          <div>
            <label className="label">Requester Email</label>
            <input 
              type="email" 
              value={user?.email || ""} 
              disabled 
              className="input input-bordered w-full text-gray-600 bg-gray-100" 
            />
          </div>

          {/* Recipient Info */}
          <div>
            <label className="label">
              <span className="label-text">Recipient Name *</span>
            </label>
            <input 
              type="text" 
              placeholder="Patient's Name" 
              value={form.recipientName} 
              onChange={(e) => setForm({...form, recipientName: e.target.value})} 
              className="input input-bordered w-full" 
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Recipient District *</span>
            </label>
            <input 
              type="text" 
              placeholder="e.g. Dhaka" 
              value={form.recipientDistrict} 
              onChange={(e) => setForm({...form, recipientDistrict: e.target.value})} 
              className="input input-bordered w-full" 
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Recipient Upazila *</span>
            </label>
            <input 
              type="text" 
              placeholder="e.g. Mirpur" 
              value={form.recipientUpazila} 
              onChange={(e) => setForm({...form, recipientUpazila: e.target.value})} 
              className="input input-bordered w-full" 
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Hospital Name *</span>
            </label>
            <input 
              type="text" 
              placeholder="Hospital Name" 
              value={form.hospitalName} 
              onChange={(e) => setForm({...form, hospitalName: e.target.value})} 
              className="input input-bordered w-full" 
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Full Address *</span>
            </label>
            <input 
              type="text" 
              placeholder="Complete Hospital Address" 
              value={form.fullAddress} 
              onChange={(e) => setForm({...form, fullAddress: e.target.value})} 
              className="input input-bordered w-full" 
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Blood Group *</span>
            </label>
            <select 
              className="select select-bordered w-full" 
              value={form.bloodGroup} 
              onChange={(e) => setForm({...form, bloodGroup: e.target.value})} 
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
          </div>

          <div>
            <label className="label">
              <span className="label-text">Donation Date *</span>
            </label>
            <input 
              type="date" 
              value={form.date} 
              onChange={(e) => setForm({...form, date: e.target.value})} 
              className="input input-bordered w-full" 
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Donation Time *</span>
            </label>
            <input 
              type="time" 
              value={form.time} 
              onChange={(e) => setForm({...form, time: e.target.value})} 
              className="input input-bordered w-full" 
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Request Message *</span>
            </label>
            <textarea 
              placeholder="Describe the urgency and details..." 
              value={form.requestMessage} 
              onChange={(e) => setForm({...form, requestMessage: e.target.value})} 
              className="textarea textarea-bordered w-full" 
              rows="4"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Request"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateDonationRequest;