import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Modal";
import UserRegisteration from "./UserRegisteration";
const UserList = () => {
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("token");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:4000/users/api",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleEdit = (user) => {
    setSelectedUser(user); // ✅ correct hook setter
    setIsModalOpen(true);
  };
  const handleAddUser = () => {
    setIsModalOpen(true);
    setSelectedUser(null)
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/users/api/${id}`);
      setUser((prev) => prev.filter((user) => user.id !== id));
      setSuccess("User deleted successfully!");
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to delete user. Try again."
      );
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-green-600 text-center mb-4">
            User List
          </h1>
          <button onClick={() => handleAddUser()} className="bg-green-400 hover:bg-amber-500 text-white font-medium px-4 py-2 rounded-lg shadow transition duration-200 space-x-80">Add User</button>
        </div>

        <div className="overflow-ellipsis">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">First Name</th>
                <th className="px-4 py-2 text-left">Last Name</th>
                <th className="px-4 py-2 text-left">User Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {user.length > 0 ? (
                user.map((u, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-4 py-2 border-t">{index + 1}</td>
                    <td className="px-4 py-2 border-t">{u.first_name}</td>
                    <td className="px-4 py-2 border-t">{u.last_name}</td>
                    <td className="px-4 py-2 border-t">{u.username}</td>
                    <td className="px-4 py-2 border-t">{u.email}</td>
                    <td className="px-4 py-2 border-t">{u.role}</td>
                    <td className="px-4 py-2 border-t">{u.department_name}</td>
                    <td className="px-4 py-2 border-t">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(u)}
                          className="bg-amber-400 hover:bg-amber-500 text-white font-medium px-4 py-2 rounded-lg shadow transition duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg shadow transition duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Modal with form */}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <UserRegisteration
              existingUser={selectedUser}
              onClose={() => {
                setIsModalOpen(false);
                fetchUsers(); // refresh
              }}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default UserList;
