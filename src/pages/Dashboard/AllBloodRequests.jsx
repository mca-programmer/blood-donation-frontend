import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import DonationCard from "../../components/DonationCard";
import Loading from "../../components/Loading";

const AllBloodRequests = () => {
  const { axiosInstance } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/donation-requests");
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to load requests", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [axiosInstance]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-red-600">
            🩸 All Blood Donation Requests
          </h2>
          <p className="text-gray-500 mt-1">
            View and manage all blood donation requests
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-32">
            <Loading text="Loading blood requests..." />
          </div>
        )}

        {/* Data */}
        {!loading && requests.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {requests.map((req) => (
              <DonationCard
                key={req._id}
                donation={req}
                className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && requests.length === 0 && (
          <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md py-24">
            <div className="text-6xl mb-4">🩸</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No Donation Requests Found
            </h3>
            <p className="text-gray-500 max-w-md text-center">
              There are currently no blood donation requests. Check back later
              or encourage users to create new requests.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllBloodRequests;
