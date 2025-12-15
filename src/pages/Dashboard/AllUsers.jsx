import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import Loading from "../../components/Loading";

const AllUsers = () => {
  const { axiosInstance } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [axiosInstance]);

  const toggleStatus = async (userId, status) => {
    try {
      await axiosInstance.patch(`/users/${userId}/status`, { status });
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, status } : u))
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  const changeRole = async (userId, role) => {
    try {
      await axiosInstance.patch(`/users/${userId}/role`, { role });
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role } : u))
      );
    } catch (err) {
      console.error("Role update failed", err);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-red-600">
            👥 All Users
          </h2>
          <p className="text-gray-500 mt-1">
            Manage registered users, roles & access
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-32">
            <Loading text="Loading users..." />
          </div>
        )}

        {/* Users Grid */}
        {!loading && users.length > 0 && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {users.map((u) => (
              <div
                key={u._id}
                className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Avatar */}
                <div className="w-20 h-20 mb-3">
                  {u.avatar ? (
                    <img
                      src={u.avatar}
                      alt={u.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-red-500"
                      onError={(e) =>
                        (e.target.src = "/default-avatar.png")
                      }
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center font-bold text-xl border-2 border-red-600">
                      {(u.name || u.email)
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="font-bold text-lg text-gray-800">
                  {u.name || "No Name"}
                </h3>
                <p className="text-sm text-gray-500 truncate w-full">
                  {u.email}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      u.role === "admin"
                        ? "bg-gradient-to-r from-red-500 to-red-700 text-white"
                        : u.role === "volunteer"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {u.role}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      u.status === "active"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {u.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {u.status === "active" ? (
                    <button
                      className="btn btn-xs btn-warning"
                      onClick={() =>
                        toggleStatus(u._id, "blocked")
                      }
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() =>
                        toggleStatus(u._id, "active")
                      }
                    >
                      Unblock
                    </button>
                  )}

                  {u.role !== "admin" && (
                    <button
                      className="btn btn-xs btn-primary"
                      onClick={() =>
                        changeRole(u._id, "admin")
                      }
                    >
                      Make Admin
                    </button>
                  )}

                  {u.role === "donor" && (
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() =>
                        changeRole(u._id, "volunteer")
                      }
                    >
                      Make Volunteer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && users.length === 0 && (
          <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md py-24">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No Users Found
            </h3>
            <p className="text-gray-500">
              Users will appear here once they register.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllUsers;
