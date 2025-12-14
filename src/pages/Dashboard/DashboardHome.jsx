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
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [axiosInstance]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Welcome */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-red-600 mb-2">
            Welcome back, {user?.name || "User"}! 👋
          </h1>
          <p className="text-gray-800">
            Here's an overview of the Blood Donation platform
          </p>
        </div>

        {/* Stats */}
        {loading ? (
          <div className="text-center py-10">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-400 mb-8">
            <StatsCard
              title="Total Users"
              count={stats.totalUsers}
              icon="👥"
              gradient="bg-gradient-to-r from-red-500 to-red-600 text-white"
            />
            <StatsCard
              title="Total Funds Raised"
              count={`$${stats.totalFunds}`}
              icon="💰"
              gradient="bg-gradient-to-r from-red-400 to-red-500 text-white"
            />
            <StatsCard
              title="Blood Requests"
              count={stats.totalRequests}
              icon="🩸"
              gradient="bg-gradient-to-r from-red-600 to-red-700 text-whit"
            />
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-red-600 mb-4 text-center md:text-left">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Create Request",
                desc: "Post a blood donation request",
                link: "/dashboard/create-donation-request",
                gradient: "bg-gradient-to-r from-red-500 to-red-600 text-white",
              },
              {
                title: "My Requests",
                desc: "View your donation requests",
                link: "/dashboard/my-donation-requests",
                gradient: "bg-gradient-to-r from-red-400 to-red-500 text-white",
              },
              {
                title: "Pending Requests",
                desc: "Browse blood donation needs",
                link: "/donation-requests",
                gradient: "bg-gradient-to-r from-red-600 to-red-700 text-white",
              },
              {
                title: "My Profile",
                desc: "Update your information",
                link: "/dashboard/profile",
                gradient: "bg-gradient-to-r from-red-500 to-red-600 text-white",
              },
            ].map((action) => (
              <a
                key={action.title}
                href={action.link}
                className={`${action.gradient} rounded-2xl p-6 shadow-xl transform transition hover:scale-105 hover:shadow-2xl`}
              >
                <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                <p className="text-sm">{action.desc}</p>
              </a>
            ))}
          </div>
        </div>

        {/* User Info Card */}
        <div className="mt-8">
          <h2 className="text-xl text-center font-bold text-red-600 mb-4">
            Your Information
          </h2>
          <div className="max-w-md mx-auto bg-gradient-to-r from-red-100 via-red-50 to-white p-6 rounded-2xl shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            {/* User Info */}
            <div className="flex items-center gap-4 mb-6">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-red-500 shadow-sm"
                  onError={(e) => (e.target.src = "/default-avatar.png")}
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center font-bold text-xl border-2 border-red-600 shadow-inner">
                  {user?.name
                    ? user.name.charAt(0).toUpperCase()
                    : user?.email.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  {user?.name || "Anonymous"}
                </h3>
                <p className="text-sm text-gray-600">
                  {user?.email || "Not Provided"}
                </p>
              </div>
            </div>

            {/* User Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/70 p-4 rounded-lg shadow-sm hover:shadow-md transition">
                <p className="text-sm text-gray-600">Blood Group</p>
                <p className="font-semibold text-gray-800">
                  {user?.bloodGroup || "Not Set"}
                </p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg shadow-sm hover:shadow-md transition">
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-semibold text-gray-800">
                  {user?.district && user?.upazila
                    ? `${user.upazila}, ${user.district}`
                    : "Not Set"}
                </p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg shadow-sm hover:shadow-md transition">
                <p className="text-sm text-gray-600">Role</p>
                <p className="font-semibold text-gray-800 capitalize">
                  {user?.role || "Donor"}
                </p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg shadow-sm hover:shadow-md transition flex items-center justify-between">
                <p className="text-sm text-gray-600">Status</p>
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
