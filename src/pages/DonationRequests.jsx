// src/pages/DonationRequests.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DonationCard from "../components/DonationCard";
import { useAuth } from "../context/AuthContext";

const DonationRequests = () => {
  const { axiosInstance } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    bloodGroup: "",
    district: "",
    status: "pending"
  });

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.bloodGroup) params.append("bloodGroup", filters.bloodGroup);
      if (filters.district) params.append("district", filters.district);
      if (filters.status) params.append("status", filters.status);

      const res = await axiosInstance.get(`/donation-requests?${params.toString()}`);
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({ bloodGroup: "", district: "", status: "pending" });
  };

  return (
    <div >
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gray-800 container mx-auto text-white py-12">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">🩸 Blood Donation Requests</h1>
          <p className="text-xl">Help save lives by donating blood to those in need</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-gray-100 py-6 container mx-auto">
        <div className="container mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-700 mb-4">🔍 Filter Requests</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {/* Blood Group Filter */}
              <select 
                className="select select-bordered w-full"
                value={filters.bloodGroup}
                onChange={(e) => handleFilterChange("bloodGroup", e.target.value)}
              >
                <option value="">All Blood Groups</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>

              {/* District Filter */}
              <input 
                type="text" 
                placeholder="Filter by District" 
                className="input input-bordered w-full"
                value={filters.district}
                onChange={(e) => handleFilterChange("district", e.target.value)}
              />

              {/* Status Filter */}
              <select 
                className="select select-bordered w-full"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Completed</option>
              </select>

              {/* Clear Button */}
              <button 
                onClick={clearFilters}
                className="btn btn-outline btn-error"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Requests Section */}
      <section className="container mx-auto py-12 px-4">
        {loading ? (
          <div className="text-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-4 text-gray-600">Loading donation requests...</p>
          </div>
        ) : requests.length ? (
          <>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-center text-white">
                Found {requests.length} Request{requests.length !== 1 ? 's' : ''}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requests.map(req => (
                <DonationCard 
                  key={req._id} 
                  donation={req}
                  showActions={true}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No Requests Found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your filters or check back later
            </p>
            <button 
              onClick={clearFilters}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default DonationRequests;