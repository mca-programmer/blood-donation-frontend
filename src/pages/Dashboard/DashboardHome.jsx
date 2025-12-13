// src/pages/Dashboard/DashboardHome.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import StatsCard from "../../components/StatsCard";
import { useAuth } from "../../context/AuthContext";

const DashboardHome = () => {
  const { axiosInstance, user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunds: 0,
    totalRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
        // If stats API fails, just show 0s
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [axiosInstance]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">
            Welcome back, {user?.name || "User"}! 👋
          </h1>
          <p className="text-gray-800">
            Here's an overview of the Blood Donation platform
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 text-gray-600 text-center">
            <StatsCard title="Total Users" count={stats.totalUsers} icon="👥" />
            <StatsCard
              title="Total Funds Raised"
              count={`$${stats.totalFunds}`}
              icon="💰"
            />
            <StatsCard
              title="Blood Requests"
              count={stats.totalRequests}
              icon="🩸"
            />
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-indigo-600 mb-4">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/dashboard/create-donation-request"
              className="card bg-white p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-indigo-600">Create Request</h3>
              <p className="text-sm text-gray-800">
                Post a blood donation request
              </p>
            </a>

            <a
              href="/dashboard/my-donation-requests"
              className="card bg-white p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-indigo-600">My Requests</h3>
              <p className="text-sm text-gray-800">
                View your donation requests
              </p>
            </a>

            <a
              href="/donation-requests"
              className="card bg-white p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-indigo-600">
                Pending Requests
              </h3>
              <p className="text-sm text-gray-800">
                Browse blood donation needs
              </p>
            </a>

            <a
              href="/dashboard/profile"
              className="card bg-white p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-indigo-600">My Profile</h3>
              <p className="text-sm text-gray-800">Update your information</p>
            </a>
          </div>
        </div>

        {/* User Info Card */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-indigo-600 mb-4">
            Your Information
          </h2>
          <div className="card bg-white text-gray-600 p-6 shadow">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={user?.avatar || "/default-avatar.png"}
                alt={user?.name}
                className="w-16 h-16 rounded-full object-cover"
                onError={(e) => (e.target.src = "/default-avatar.png")}
              />
              <div>
                <h3 className="font-bold text-lg">{user?.name}</h3>
                <p className="text-sm text-gray-800">{user?.email}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-800">Blood Group</p>
                <p className="font-semibold">{user?.bloodGroup || "Not Set"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-800">Location</p>
                <p className="font-semibold">
                  {user?.district && user?.upazila
                    ? `${user.upazila}, ${user.district}`
                    : "Not Set"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-800">Role</p>
                <p className="font-semibold capitalize">
                  {user?.role || "Donor"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-800">Status</p>
                <span
                  className={`badge ${
                    user?.status === "active" ? "badge-success" : "badge-error"
                  }`}
                >
                  {user?.status || "Active"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;
