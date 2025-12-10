// src/pages/Dashboard/DashboardHome.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import StatsCard from "../../components/StatsCard";
import { useAuth } from "../../context/AuthContext";

const DashboardHome = () => {
  const { axiosInstance, user } = useAuth();
  const [stats, setStats] = useState({ totalUsers: 0, totalFunds: 0, totalRequests: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, [axiosInstance]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 text-blue-500 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <StatsCard title="Total Users" count={stats.totalUsers} icon="👤" />
          <StatsCard title="Total Funds" count={`$${stats.totalFunds}`} icon="💰" />
          <StatsCard title="Total Donation Requests" count={stats.totalRequests} icon="🩸" />
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;
