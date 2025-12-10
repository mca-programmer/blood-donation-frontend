// src/pages/Dashboard/MyDonationRequests.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import DonationCard from "../../components/DonationCard";
import Pagination from "../../components/Pagination";

const MyDonationRequests = () => {
  const { axiosInstance, user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRequests = async () => {
    try {
      const res = await axiosInstance.get(`/donation-requests/my?page=${page}`);
      setRequests(res.data.requests);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchRequests(); }, [page]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-400 text-indigo-500">
        <h2 className="text-2xl font-bold mb-6">My Donation Requests</h2>
        <div className="grid md:grid-cols-3 gap-6 ">
          {requests.length ? requests.map(req => (
            <DonationCard key={req._id} donation={req} />
          )) : <p>No donation requests found.</p>}
        </div>
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </main>
    </div>
  );
};

export default MyDonationRequests;
