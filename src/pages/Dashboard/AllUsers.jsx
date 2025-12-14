// src/pages/Dashboard/AllUsers.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";

const AllUsers = () => {
  const { axiosInstance } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [axiosInstance]);

  const toggleStatus = async (userId, status) => {
    try {
      await axiosInstance.patch(`/users/${userId}/status`, { status });
      setUsers(users.map(u => u._id === userId ? { ...u, status } : u));
    } catch (err) { console.error(err); }
  };

  const changeRole = async (userId, role) => {
    try {
      await axiosInstance.patch(`/users/${userId}/role`, { role });
      setUsers(users.map(u => u._id === userId ? { ...u, role } : u));
    } catch (err) { console.error(err); }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h2 className="text-3xl text-center font-bold text-red-600 mb-6">All Users</h2>

        {loading ? (
          <div className="text-center py-20">
            <span className="loading loading-spinner loading-lg text-red-500"></span>
            <p className="mt-4 text-gray-600">Loading users...</p>
          </div>
        ) : users.length ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {users.map(u => (
              <div
                key={u._id}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-xl transition"
              >
                <div className="w-20 h-20 mb-3">
                  {u.avatar ? (
                    <img
                      src={u.avatar}
                      alt={u.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-red-500"
                      onError={(e) => (e.target.src = "/default-avatar.png")}
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center font-bold text-xl border-2 border-red-600">
                      {u.name ? u.name.charAt(0).toUpperCase() : u.email.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-lg text-gray-800">{u.name}</h3>
                <p className="text-sm text-gray-500">{u.email}</p>

                <div className="flex flex-wrap justify-center gap-2 mt-2 w-full">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    u.role === "admin" ? "bg-gradient-to-r from-red-500 to-red-700 text-white" :
                    u.role === "volunteer" ? "bg-green-200 text-green-800" :
                    "bg-blue-100 text-blue-800"
                  }`}>
                    {u.role}
                  </span>

                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    u.status === "active" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  }`}>
                    {u.status}
                  </span>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {u.status === "active" ? (
                    <button
                      className="btn btn-xs btn-warning"
                      onClick={()=>toggleStatus(u._id,"blocked")}
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      className="btn btn-xs btn-success"
                      onClick={()=>toggleStatus(u._id,"active")}
                    >
                      Unblock
                    </button>
                  )}

                  {u.role !== "admin" && (
                    <button
                      className="btn btn-xs btn-primary"
                      onClick={()=>changeRole(u._id,"admin")}
                    >
                      Make Admin
                    </button>
                  )}

                  {u.role === "donor" && (
                    <button
                      className="btn btn-xs btn-info"
                      onClick={()=>changeRole(u._id,"volunteer")}
                    >
                      Make Volunteer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Users Found</h3>
            <p className="text-gray-500 mb-6">Users will appear here once they register.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllUsers;
