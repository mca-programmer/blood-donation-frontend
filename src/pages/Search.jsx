// src/pages/Search.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DonationCard from "../components/DonationCard";
import { useAuth } from "../context/AuthContext";

const Search = () => {
  const { axiosInstance } = useAuth();
  const [filters, setFilters] = useState({ bloodGroup: "", district: "", upazila: "" });
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.get("/donors/search", { params: filters });
      setResults(res.data);
    } catch (err) {
      console.error(err);
      alert("Search failed");
    }
  };

  return (
    <div>
      <Navbar />
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Search Donors</h2>
        <form onSubmit={handleSearch} className="grid md:grid-cols-4 gap-4 mb-8">
          <select className="select select-bordered" 
                  value={filters.bloodGroup} 
                  onChange={(e) => setFilters({ ...filters, bloodGroup: e.target.value })}>
            <option value="">Select Blood Group</option>
            <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
            <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
          </select>
          <input type="text" placeholder="District" className="input input-bordered"
                 value={filters.district} onChange={(e) => setFilters({ ...filters, district: e.target.value })}/>
          <input type="text" placeholder="Upazila" className="input input-bordered"
                 value={filters.upazila} onChange={(e) => setFilters({ ...filters, upazila: e.target.value })}/>
          <button className="btn btn-primary w-full">Search</button>
        </form>

        <div className="grid md:grid-cols-3 gap-6">
          {results.length ? results.map(donor => (
            <DonationCard key={donor._id} donation={donor} />
          )) : <p className="text-center col-span-full">No donors found.</p>}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Search;
