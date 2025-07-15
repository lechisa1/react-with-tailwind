import React, { useState, useEffect } from "react";
import axios from "axios";
import RequestList from "./request/RequestList";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Maintenances = ({ existingUser, onClose }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    item_name: "",

    priority: "",
    category_issue: "",
    description: "",
  });
  useEffect(() => {
    fetchRequests();
  }, []);
  useEffect(() => {
    if (existingUser) {
      setFormData({ ...existingUser });
    }
  }, [existingUser]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEdit = (requests) => {
    setSelectedUser(requests); // ✅ correct hook setter
    setIsModalOpen(true);
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/maintenances/api/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // token from login
          },
        }
      );
      alert("are you sure to delete this request?");
      if (response.status === 200) {
        toast.success(response.data.message);
        setRequests(requests.filter((request) => request.id !== id));
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      // Example API endpoint - replace with your actual endpoint
      if (existingUser) {
        const response = await axios.put(
          `http://localhost:4000/maintenances/api/${existingUser.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // token from login
            },
          }
        );
        setSuccess(response.data.message);
        toast.success(response.data.message);
      } else {
        const response = await axios.post(
          "http://localhost:4000/maintenances/api",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // token from login
            },
          }
        );
        if (response.status === 201) {
          toast.success(response.data.message);
          setSuccess(response.data.message);

          setFormData({
            item_name: "",

            priority: "",
            category_issue: "",
            description: "",
          });
          navigate("/protected/requests/index");
        } else {
          toast.error(response.data.error);
          setError(response.data.error);
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to submit request. Try again."
      );
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
    onClose();
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/maintenances/api",
        {
          headers: {
            Authorization: `Bearer ${token}`, // token from login
          },
        }
      );
      setRequests(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to fetch requests. Try again."
      );
      console.error("Error fetching requests:", error);
    }
  };
  const handleApprove = async (id) => {
    console.log("handleApprove called with id:", id);
    console.log("Token being sent:", token);

    try {
      console.log("handleApprove called with id:", id);
      console.log("Token being sent:", token);
      const response = await axios.put(
        `http://localhost:4000/maintenances/api/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response from approve request:", response);

      if (response.status === 201) {
        toast.success("Request approved successfully!");
      } else {
        toast.error(response.data?.error);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.response?.data?.error);
    }
  };
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-green-600 text-center mb-8">
        Maintenance Request
      </h1>

      <div className="bg-white rounded-lg shadow-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Item Name
              </label>
              <input
                type="text"
                id="item_name"
                name="item_name"
                value={formData.item_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Desktop"
                required
              />
            </div>

            <div>
              <label className="text-lg block text-gray-700" htmlFor="priority">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select priority</option>
                <option value="low">low</option>
                <option value="high">high</option>
                <option value="medium">Medium</option>
                <option value="emergency">Emergency</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="issueType">
                Issue Type
              </label>
              <select
                id="category_issue"
                name="category_issue"
                value={formData.category_issue}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select an issue type</option>
                <option value="electrical">Electrical</option>
                <option value="plumbing">Plumbing</option>
                <option value="structural">Structural</option>
                <option value="appliance">Appliance</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 min-h-[100px]"
                placeholder="Please describe the issue in detail..."
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Submit Request
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Maintenance Requests Table - For Index Page */}
      {/* <div className="">

        <RequestList />
      </div> */}
      <div className="p-6 bg-white rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-green-600 text-center mb-4">
            Request List
          </h1>
          <button
            onClick={() => handleAddUser()}
            className="bg-green-400 hover:bg-amber-500 text-white font-medium px-4 py-2 rounded-lg shadow transition duration-200 space-x-80"
          >
            Add Request
          </button>
        </div>
        <div className="overflow-ellipsis">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Item Name</th>
                <th className="py-2 px-4 text-left">Priority</th>
                <th className="py-2 px-4 text-left">Category Issue</th>
                <th className="py-2 px-4 text-center">Description</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={index} className="hover:bg-gray-100 transition-colors">
                  <td className="py-2 px-4 border-t">{index + 1}</td>
                  <td className="py-2 px-4 border-t">{request.item_name}</td>
                  <td className="py-2 px-4 border-t">{request.priority}</td>
                  <td className="py-2 px-4 border-t">
                    {request.category_issue}
                  </td>
                  <td
                    className="py-2 px-4 border-t max-w-[200px] truncate "
                    title={request.description}
                  >
                    {request.description}
                  </td>
                  <td className="py-2 px-4 border-t">
                    {request.status === "pending" ? (
                      <span className="bg-yellow-600 font-semibold badge text-white px-2 py-1 rounded">
                        {request.status}
                      </span>
                    ) : request.status === "approved" ? (
                      <span className="bg-green-600 font-semibold badge text-white px-2 py-1 rounded">
                        {request.status}
                      </span>
                    ) : (
                      <span className="bg-red-600 font-semibold badge text-white px-2 py-1 rounded">
                        {request.status}
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-t flex gap-2">
                    <button
                      onClick={() => handleDelete(request.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(request)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Maintenances;
