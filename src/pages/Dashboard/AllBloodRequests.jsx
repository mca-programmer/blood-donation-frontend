// src/pages/Dashboard/AllBloodRequests.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import DonationCard from "../../components/DonationCard";

const AllBloodRequests = () => {
  const { axiosInstance } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosInstance.get("/donation-requests");
        setRequests(res.data);
      } catch (err) { console.error(err); }
    };
    fetchRequests();
  }, [axiosInstance]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">All Blood Donation Requests</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {requests.length ? requests.map(req => (
            <DonationCard key={req._id} donation={req} />
          )) : <p>No donation requests found.</p>}
        </div>
      </main>
    </div>
  );
};

export default AllBloodRequests;
