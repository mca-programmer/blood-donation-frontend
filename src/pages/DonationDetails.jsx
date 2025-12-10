// src/pages/DonationDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";

const DonationDetails = () => {
  const { id } = useParams();
  const { axiosInstance, user } = useAuth();
  const [donation, setDonation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const res = await axiosInstance.get(`/donation-requests/${id}`);
        setDonation(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDonation();
  }, [axiosInstance, id]);

  const handleDonate = async () => {
    try {
      await axiosInstance.post(`/donation-requests/${id}/donate`, {
        donorName: user.name,
        donorEmail: user.email
      });
      alert("Donation status updated to in-progress!");
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to donate.");
    }
  };

  if (!donation) return <p className="text-center py-20">Loading...</p>;

  return (
    <div>
      <Navbar />
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Donation Request Details</h2>
        <div className="card shadow-md p-6 rounded-lg max-w-xl mx-auto">
          <p><strong>Recipient:</strong> {donation.recipientName}</p>
          <p><strong>Location:</strong> {donation.recipientDistrict}, {donation.recipientUpazila}</p>
          <p><strong>Blood Group:</strong> {donation.bloodGroup}</p>
          <p><strong>Hospital:</strong> {donation.hospitalName}</p>
          <p><strong>Address:</strong> {donation.fullAddress}</p>
          <p><strong>Date:</strong> {donation.date}</p>
          <p><strong>Time:</strong> {donation.time}</p>
          <p><strong>Message:</strong> {donation.requestMessage}</p>
          <p className="mt-4"><strong>Status:</strong> {donation.status}</p>

          {donation.status === "pending" && (
            <button className="btn btn-primary mt-4" onClick={() => setModalOpen(true)}>
              Donate
            </button>
          )}
        </div>
      </section>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Confirm Donation">
        <p>Are you sure you want to donate blood for {donation.recipientName}?</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleDonate}>Confirm</button>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default DonationDetails;
