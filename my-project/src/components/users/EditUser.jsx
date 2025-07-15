import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const UserRegisteration = () => {
  const [departments, setDepartments] = useState([]);
  const departmentsApi = "http://localhost:4000/department/api";
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const userApi = "http://localhost:4000/users/api";
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    department_id: "",
  });
  useEffect(() => {
    axios
      .get(departmentsApi)
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error("Failed to fetch departments:", err));
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e,id) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:4000/users/api/${id}`, formData);
      console.log("userrrrrrrrr", formData);
      setSuccess("User updated successfully!");
      setFormData({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        phone: "",
        role: "",
        password: "",
        department_id: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to register user. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            {success && (
              <p className="text-green-500 text-center mt-4">{success}</p>
            )}

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="first_name">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Lechisa"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="last_name">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Bedasa"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="lechi@2025"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="lechi@123gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="(+2519) 98789876"
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 mb-2"
                htmlFor="department_id"
              >
                Select Department
              </label>
              <select
                id="department_id"
                name="department_id"
                value={formData.department_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="" disabled>
                  Select Department
                </option>
                {departments.map((dep) => (
                  <option key={dep.id} value={dep.id}>
                    {dep.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block text-gray-700 mb-2"
                htmlFor="department_id"
              >
                Select Role
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="admin">Admin</option>
                <option value="director">Director</option>
                <option value="technician">Technician</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="***"
                required
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`bg-green-500 text-white px-6 py-2 rounded-lg transition duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
              }`}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegisteration;
