// src/pages/Dashboard/MyDonationRequests.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import DonationCard from "../../components/DonationCard";
import Pagination from "../../components/Pagination";

const MyDonationRequests = () => {
  const { axiosInstance } = useAuth();
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/donation-requests/my?page=${currentPage}`
      );
      setRequests(res.data.requests);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this donation request?")) return;

    try {
      await axiosInstance.delete(`/donation-requests/${id}`);
      alert("Request deleted successfully!");
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete request");
    }
  };

  const handleEdit = (donation) => {
    alert(`Edit functionality for ${donation.recipientName} - Coming soon!`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="mb-6 text-center md:text-left">
          <h2 className="text-3xl font-bold text-red-600">My Donation Requests</h2>
          <p className="text-gray-600 mt-2">
            Manage your blood donation requests
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <span className="loading loading-spinner loading-lg text-red-600"></span>
            <p className="mt-4 text-gray-600">Loading your requests...</p>
          </div>
        ) : requests.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req) => (
              <DonationCard
                key={req._id}
                donation={req}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gradient-to-br from-red-50 via-red-100 to-white rounded-3xl shadow-lg">
            <div className="text-6xl mb-4 animate-bounce">🩸</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No Donation Requests Yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first blood donation request to help those in need
            </p>
            <a
              href="/dashboard/create-donation-request"
              className="btn bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:scale-105 transform transition py-3 px-6 rounded-xl"
            >
              Create Request
            </a>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default MyDonationRequests;
