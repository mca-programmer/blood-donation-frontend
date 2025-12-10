// src/pages/DonationRequests.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DonationCard from "../components/DonationCard";
import { useAuth } from "../context/AuthContext";

const DonationRequests = () => {
  const { axiosInstance } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosInstance.get("/donation-requests?status=pending");
        setRequests(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRequests();
  }, [axiosInstance]);

  return (
    <div>
      <Navbar />
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Pending Blood Donation Requests</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {requests.length ? requests.map(req => (
            <DonationCard key={req._id} donation={req} />
          )) : <p className="text-center col-span-full">No pending requests.</p>}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DonationRequests;
