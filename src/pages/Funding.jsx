// src/pages/Funding.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const Funding = () => {
  const { axiosInstance, user } = useAuth();
  const [funds, setFunds] = useState([]);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all funds
  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const res = await axiosInstance.get("/funds");
        setFunds(res.data);
      } catch (err) {
        console.error("Fetch Funds Error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFunds();
  }, [axiosInstance]);

  // Handle fund submission
  const handleGiveFund = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    try {
      const res = await axiosInstance.post("/funds", {
        amount: parseFloat(amount),
      });
      setFunds([res.data, ...funds]);
      setAmount("");
      alert("Thank you for your contribution!");
    } catch (err) {
      console.error("Give Fund Error:", err.response?.data || err.message);
      alert("Failed to give fund: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-red-50 text-gray-600">
        <h2 className="text-2xl font-bold mb-6">Funding Page</h2>

        {/* Give Fund Form */}
        <div className="card max-w-md p-6 shadow-lg mb-6 bg-white">
          <h3 className="text-xl font-semibold mb-4">Give Fund</h3>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Amount in USD"
              className="input input-bordered text-white flex-1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button className="btn btn-primary hover:bg-red-500" onClick={handleGiveFund}>
              Donate
            </button>
          </div>
        </div>

        {/* All Funds Table */}
        <div className="card p-6 shadow-lg bg-white">
          <h3 className="text-xl text-gray-600 font-semibold mb-4">All Fundings</h3>
          {loading ? (
            <div className="text-center py-10">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full text-gray-600">
                <thead>
                  <tr className="text-gray-700">
                    <th>User</th>
                    <th>Email</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {funds.length
                    ? funds.map((f) => (
                        <tr key={f._id}>
                          <td>{f.userName}</td>
                          <td>{f.userEmail}</td>
                          <td>${f.amount}</td>
                          <td>{new Date(f.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))
                    : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No funds given yet.
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Funding;
