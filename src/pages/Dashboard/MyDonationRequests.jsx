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

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold text-red-600 mb-6">
          My Donation Requests
        </h2>

        {loading ? (
          <div className="text-center py-10">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              {requests.length ? (
                requests.map((req) => (
                  <DonationCard key={req._id} donation={req} />
                ))
              ) : (
                <p className="col-span-3 text-center text-gray-500">
                  No donation requests found. Create your first request!
                </p>
              )}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default MyDonationRequests;
