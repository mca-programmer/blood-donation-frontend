// src/pages/DonationDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";

const DonationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axiosInstance, user } = useAuth();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  // ✅ Fetch donation data
  const fetchDonation = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/donation-requests/${id}`);
      setDonation(res.data);
      console.log("✅ Donation fetched:", res.data);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      alert("Failed to fetch donation details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonation();
  }, [id]);

  // ✅ Handle Donate (Pending → In Progress)
  const handleDonate = async () => {
    try {
      const res = await axiosInstance.post(`/donation-requests/${id}/donate`, {
        donorName: user.name,
        donorEmail: user.email
      });
      console.log("✅ Donation response:", res.data);
      alert("Thank you! Donation status updated to In Progress.");
      setDonateModalOpen(false);
      fetchDonation(); // ✅ Refresh data immediately
    } catch (err) {
      console.error("❌ Donate error:", err);
      alert(err.response?.data?.message || "Failed to donate.");
    }
  };

  // ✅ Handle Status Change (Any Status → Any Status)
  const handleStatusChange = async (newStatus) => {
    try {
      const res = await axiosInstance.put(`/donation-requests/${id}`, {
        ...donation,
        status: newStatus
      });
      console.log("✅ Status changed:", res.data);
      alert(`Status updated to ${newStatus.toUpperCase()}`);
      setStatusModalOpen(false);
      fetchDonation(); // ✅ Refresh data immediately
    } catch (err) {
      console.error("❌ Status change error:", err);
      alert(err.response?.data?.message || "Failed to update status.");
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
        <Footer />
      </div>
    );
  }

  if (!donation) {
    return (
      <div>
        <Navbar />
        <p className="text-center py-20 text-gray-600">Donation request not found.</p>
        <Footer />
      </div>
    );
  }

  // Check permissions
  const isOwner = user?.email === donation.requesterEmail;
  const isAdmin = user?.role === "admin";
  const canChangeStatus = isOwner || isAdmin;

  // Status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "inprogress": return "bg-blue-100 text-blue-800";
      case "done": return "bg-green-100 text-green-800";
      case "canceled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <section className="container mx-auto py-12 px-4">
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-ghost mb-6 text-indigo-600"
        >
          ← Back
        </button>

        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg shadow-lg p-8 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Blood Needed for {donation.recipientName}
                </h1>
                <p className="text-lg opacity-90">
                  📍 {donation.recipientDistrict}, {donation.recipientUpazila}
                </p>
              </div>
              <div className={`${getStatusColor(donation.status)} px-4 py-2 rounded-full font-bold text-sm`}>
                {donation.status.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Blood Group */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 text-center">
            <h2 className="text-xl font-semibold text-gray-600 mb-3">Blood Group Needed</h2>
            <div className="text-7xl font-bold text-red-600">
              🩸 {donation.bloodGroup}
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Request Details</h2>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">🏥 Hospital</h3>
                <p className="font-medium text-gray-900">{donation.hospitalName}</p>
                <p className="text-gray-600 text-sm mt-1">{donation.fullAddress}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-1">📅 Date</h3>
                  <p className="text-gray-900 font-medium text-lg">{donation.date}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-1">⏰ Time</h3>
                  <p className="text-gray-900 font-medium text-lg">{donation.time}</p>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                <h3 className="font-semibold text-gray-700 mb-2">💬 Request Message</h3>
                <p className="text-gray-800">{donation.requestMessage}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">👤 Requested By</h3>
                <p className="text-gray-900 font-medium">{donation.requesterName}</p>
                <p className="text-gray-600 text-sm">{donation.requesterEmail}</p>
              </div>

              {/* Donor Info (if donation accepted) */}
              {(donation.status === "inprogress" || donation.status === "done") && donation.donorName && (
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h3 className="font-semibold text-gray-700 mb-2">✅ Donor Information</h3>
                  <p className="text-gray-900 font-medium">{donation.donorName}</p>
                  <p className="text-gray-600 text-sm">{donation.donorEmail}</p>
                  <div className="badge badge-success mt-2">Donation Accepted</div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-wrap gap-4">
              {/* Donate Button (Only for non-owners, if pending) */}
              {!isOwner && donation.status === "pending" && user && (
                <button 
                  onClick={() => setDonateModalOpen(true)}
                  className="btn btn-success flex-1"
                >
                  🩸 I Want to Donate Blood
                </button>
              )}

              {/* Change Status Button (Only for owner/admin) */}
              {canChangeStatus && donation.status !== "canceled" && (
                <button 
                  onClick={() => setStatusModalOpen(true)}
                  className="btn btn-primary flex-1"
                >
                  📝 Change Status
                </button>
              )}

              {/* Login prompt for guests */}
              {!user && donation.status === "pending" && (
                <button 
                  onClick={() => navigate("/login")}
                  className="btn btn-success flex-1"
                >
                  Login to Donate Blood
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Donate Confirmation Modal */}
      <Modal 
        isOpen={donateModalOpen} 
        onClose={() => setDonateModalOpen(false)} 
        title="Confirm Blood Donation"
      >
        <div className="space-y-4">
          <p className="text-gray-700 text-lg">
            Are you sure you want to donate blood for <strong>{donation.recipientName}</strong>?
          </p>
          <div className="bg-blue-50 p-4 rounded-lg space-y-2">
            <p className="text-sm text-gray-600">
              <strong>Hospital:</strong> {donation.hospitalName}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Date:</strong> {donation.date} at {donation.time}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Blood Group:</strong> {donation.bloodGroup}
            </p>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button 
              className="btn btn-outline" 
              onClick={() => setDonateModalOpen(false)}
            >
              Cancel
            </button>
            <button 
              className="btn btn-success" 
              onClick={handleDonate}
            >
              ✅ Confirm Donation
            </button>
          </div>
        </div>
      </Modal>

      {/* Status Change Modal */}
      <Modal 
        isOpen={statusModalOpen} 
        onClose={() => setStatusModalOpen(false)} 
        title="Change Request Status"
      >
        <div className="space-y-4">
          <p className="text-gray-700 text-lg mb-4">
            Select new status for this donation request:
          </p>
          
          <div className="space-y-3">
            {donation.status !== "pending" && (
              <button
                onClick={() => handleStatusChange("pending")}
                className="btn btn-warning w-full text-left justify-start"
              >
                <span className="text-2xl mr-3">⏳</span>
                <div>
                  <div className="font-bold">Set as Pending</div>
                  <div className="text-xs opacity-70">Request is waiting for donors</div>
                </div>
              </button>
            )}
            
            {donation.status !== "inprogress" && (
              <button
                onClick={() => handleStatusChange("inprogress")}
                className="btn btn-info w-full text-left justify-start"
              >
                <span className="text-2xl mr-3">🔄</span>
                <div>
                  <div className="font-bold">Set as In Progress</div>
                  <div className="text-xs opacity-70">Donor has accepted, donation in progress</div>
                </div>
              </button>
            )}
            
            {donation.status !== "done" && (
              <button
                onClick={() => handleStatusChange("done")}
                className="btn btn-success w-full text-left justify-start"
              >
                <span className="text-2xl mr-3">✅</span>
                <div>
                  <div className="font-bold">Mark as Completed</div>
                  <div className="text-xs opacity-70">Blood donation successfully completed</div>
                </div>
              </button>
            )}
            
            {donation.status !== "canceled" && (
              <button
                onClick={() => handleStatusChange("canceled")}
                className="btn btn-error w-full text-left justify-start"
              >
                <span className="text-2xl mr-3">❌</span>
                <div>
                  <div className="font-bold">Cancel Request</div>
                  <div className="text-xs opacity-70">No longer need blood donation</div>
                </div>
              </button>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <button 
              className="btn btn-outline" 
              onClick={() => setStatusModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default DonationDetails;