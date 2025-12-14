// src/pages/Dashboard/AllBloodRequests.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import DonationCard from "../../components/DonationCard";

const AllBloodRequests = () => {
  const { axiosInstance } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/donation-requests");
        setRequests(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [axiosInstance]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-red-600 mb-6">
          All Blood Donation Requests
        </h2>

        {loading ? (
          <div className="text-center py-20">
            <span className="loading loading-spinner loading-lg text-red-500"></span>
            <p className="mt-4 text-gray-600">Loading requests...</p>
          </div>
        ) : requests.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req) => (
              <DonationCard
                key={req._id}
                donation={req}
                className="hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <div className="text-6xl mb-4">🩸</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No Donation Requests Found
            </h3>
            <p className="text-gray-500 mb-6">
              Be the first to create a blood donation request to help others.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllBloodRequests;
