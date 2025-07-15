import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import Maintenances from "../Maintenances";
const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
      useEffect(() => {
    fetchRequests();
  }, []);

const filterRequests=requests.filter((request) =>
    request.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.category_issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/maintenances/api/yours",
                  {
            headers: {
              Authorization: `Bearer ${token}`, // token from login
            },
          }
      );

      setRequests(response.data);

      // headers: {
      //     Authorization: `Bearer ${token}`, // token from login
      // },
    } catch (error) {
     toast.error(
        error.response?.data?.error 
      );
     
    }
  };


    const handleEdit = (requests) => {
    setSelectedUser(requests); // ✅ correct hook setter
    setIsModalOpen(true);
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
      toast.error(response.data?.error );
    }
  } catch (error) {
    console.error(
      
      error.response?.data || error.message
    );
    toast.error(error.response?.data?.error );
  }
};

    const handleAddUser = () => {
    setIsModalOpen(true);
    setSelectedUser(null)
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
      if (response.status === 200) {
        toast.success(response.data.message );
        setRequests(requests.filter((request) => request.id !== id));
      } else {
        toast.error(response.data.error );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error  
      );
    }
  };
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-green-600 text-center mb-4">
            Request List
          </h1>
          <button onClick={() => handleAddUser()} className="bg-green-400 hover:bg-amber-500 text-white font-medium px-4 py-2 rounded-lg shadow transition duration-200 space-x-80">Add Request</button>
        </div>
<div className="mb-4 flex justify-end">
  <input
    type="text"
    placeholder="Search everything..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}  
    className="w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
  />
</div>

      <div className="overflow-ellipsis">
        <table className="min-w-full table-auto border-collapse break-after-column">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Item Name</th>
              <th className="py-2 px-4 text-left">Priority</th>
              <th className="py-2 px-4 text-left">Category Issue</th>
              <th className="py-2 px-4 text-center whitespace-normal text-sm max-w-xs">Description</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">RequestedBy</th>
              <th className="py-2 px-4 text-left">Depatment</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterRequests.length > 0 ? (
            filterRequests.map((request,index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition-colors"
              >
                <td className="py-2 px-4 border-t">{index+1}</td>
                <td className="py-2 px-4 border-t">{request.item_name}</td>
                <td className="py-2 px-4 border-t">{request.priority}</td>
                <td className="py-2 px-4 border-t">{request.category_issue}</td>
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
                      <div>
                      <span className="bg-green-600 font-semibold badge text-white px-2 py-1 rounded">
                        {request.status} 
                      </span><span className="font-semibold badge text-black px-2 py-1 rounded">by:{request.approvedBy}</span> </div>
                    ) : (
                      <span className="bg-red-600 font-semibold badge text-white px-2 py-1 rounded">
                        {request.status}
                      </span>
                    )}
                </td>
                                <td className="py-2 px-4 border-t">{request.firstName}</td>
                                <td className="py-2 px-4 border-t">{request.userDepartment}</td>
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
            
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No requests found.
                </td>
              </tr>
            )}

          </tbody>
        </table>
                  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Maintenances
              existingUser={selectedUser}
              onClose={() => {
                setIsModalOpen(false);
                fetchRequests(); // refresh
              }}
            />
          </Modal>
      </div>
    </div>
  );
};

export default RequestList;
