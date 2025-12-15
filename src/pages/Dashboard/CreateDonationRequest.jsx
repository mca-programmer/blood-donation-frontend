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
    requestMessage: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/donation-requests", form);
      alert("Donation request created successfully!");
      setForm({
        recipientName: "",
        recipientDistrict: "",
        recipientUpazila: "",
        hospitalName: "",
        fullAddress: "",
        bloodGroup: "",
        date: "",
        time: "",
        requestMessage: "",
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <h2 className="text-3xl font-extrabold text-red-600 mb-8 text-center">
          🩸 Create Blood Donation Request
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-gradient-to-br from-red-50 via-red-100 to-white p-8 rounded-3xl shadow-2xl space-y-6"
        >
          {/* Requester Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 text-gray-600 gap-4">
            <div>
              <label className="label font-semibold">Requester Name</label>
              <input
                type="text"
                value={user?.name || ""}
                disabled
                className="input input-bordered w-full text-gray-600 bg-gray-100"
              />
            </div>
            <div>
              <label className="label font-semibold">Requester Email</label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="input input-bordered w-full text-gray-600 bg-gray-100"
              />
            </div>
          </div>

          {/* Recipient Info */}
          <div className="grid grid-cols-1 text-gray-600 md:grid-cols-2 gap-4">
            <div>
              <label className="label font-semibold">Recipient Name *</label>
              <input
                type="text"
                placeholder="Patient's Name"
                value={form.recipientName}
                onChange={(e) =>
                  setForm({ ...form, recipientName: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold">Blood Group *</label>
              <select
                className="select select-bordered w-full"
                value={form.bloodGroup}
                onChange={(e) =>
                  setForm({ ...form, bloodGroup: e.target.value })
                }
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
              <label className="label font-semibold">District *</label>
              <input
                type="text"
                placeholder="e.g. Dhaka"
                value={form.recipientDistrict}
                onChange={(e) =>
                  setForm({ ...form, recipientDistrict: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold">Upazila *</label>
              <input
                type="text"
                placeholder="e.g. Mirpur"
                value={form.recipientUpazila}
                onChange={(e) =>
                  setForm({ ...form, recipientUpazila: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold">Hospital Name *</label>
              <input
                type="text"
                placeholder="Hospital Name"
                value={form.hospitalName}
                onChange={(e) =>
                  setForm({ ...form, hospitalName: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold">Full Address *</label>
              <input
                type="text"
                placeholder="Complete Hospital Address"
                value={form.fullAddress}
                onChange={(e) =>
                  setForm({ ...form, fullAddress: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold">Donation Date *</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-semibold">Donation Time *</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="label font-semibold">Request Message *</label>
            <textarea
              placeholder="Describe the urgency and details..."
              value={form.requestMessage}
              onChange={(e) =>
                setForm({ ...form, requestMessage: e.target.value })
              }
              className="textarea textarea-bordered w-full"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:scale-105 transform transition"
          >
            {loading ? "Creating..." : "Create Request"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateDonationRequest;
