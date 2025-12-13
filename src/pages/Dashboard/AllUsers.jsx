// src/pages/Dashboard/AllUsers.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";

const AllUsers = () => {
  const { axiosInstance } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
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
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 text-gray-600">
        <h2 className="text-2xl font-bold mb-6">All Users</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-gray-600">
                <th>Avatar</th><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td><img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-full" /></td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.status}</td>
                  <td className="space-x-2">
                    {u.status === "active" ? <button className="btn btn-xs btn-warning" onClick={()=>toggleStatus(u._id,"blocked")}>Block</button>
                    : <button className="btn btn-xs btn-success" onClick={()=>toggleStatus(u._id,"active")}>Unblock</button>}
                    {u.role !== "admin" && <button className="btn btn-xs btn-primary" onClick={()=>changeRole(u._id,"admin")}>Make Admin</button>}
                    {u.role === "donor" && <button className="btn btn-xs btn-info" onClick={()=>changeRole(u._id,"volunteer")}>Make Volunteer</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AllUsers;
