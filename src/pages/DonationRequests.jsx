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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-500 to-pink-600 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">🩸 Blood Donation Requests</h1>
          <p className="text-lg md:text-xl opacity-90">Help save lives by donating blood to those in need</p>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
          <svg className="relative block w-full h-8 md:h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48">
            <path fill="#f3f4f6" fillOpacity="1" d="M0,32L80,32C160,32,320,32,480,32C640,32,800,32,960,26.7C1120,21,1280,11,1360,5.3L1440,0L1440,48L1360,48C1280,48,1120,48,960,48C800,48,640,48,480,48C320,48,160,48,80,48L0,48Z"></path>
          </svg>
        </div>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto px-4 -mt-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">🔍 Filter Requests</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

            <input 
              type="text" 
              placeholder="Filter by District" 
              className="input input-bordered w-full"
              value={filters.district}
              onChange={(e) => handleFilterChange("district", e.target.value)}
            />

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

            <button 
              onClick={clearFilters}
              className="btn btn-error btn-outline w-full"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      {/* Requests Section */}
      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20">
            <span className="loading loading-spinner loading-lg text-red-600"></span>
            <p className="mt-4 text-gray-600">Loading donation requests...</p>
          </div>
        ) : requests.length ? (
          <>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                Found {requests.length} Request{requests.length !== 1 ? 's' : ''}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="text-center py-20 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Requests Found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or check back later</p>
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
