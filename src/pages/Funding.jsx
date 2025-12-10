// src/pages/Funding.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Funding = () => {
  const { axiosInstance, user } = useAuth();
  const [funds, setFunds] = useState([]);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const res = await axiosInstance.get("/funds");
        setFunds(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFunds();
  }, [axiosInstance]);

  const handleGiveFund = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    try {
      // Stripe payment logic can be integrated here
      const res = await axiosInstance.post("/funds", { userId: user._id, amount });
      setFunds([res.data, ...funds]);
      setAmount("");
      alert("Thank you for your contribution!");
    } catch (err) {
      console.error(err);
      alert("Failed to give fund");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Funding Page</h2>

        <div className="card max-w-md p-6 shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Give Fund</h3>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Amount in USD"
              className="input input-bordered flex-1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleGiveFund}>Donate</button>
          </div>
        </div>

        <div className="card p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">All Fundings</h3>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {funds.length ? funds.map(f => (
                  <tr key={f._id}>
                    <td>{f.userName}</td>
                    <td>${f.amount}</td>
                    <td>{new Date(f.createdAt).toLocaleDateString()}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" className="text-center">No funds given yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Funding;
