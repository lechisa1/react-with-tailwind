import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("login successfully")
      navigate("/protected/dashboard");
    } catch (error) {
      toast.error("login failed")
 
    }
  };
  return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
  <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
    <h3 className="text-3xl font-semibold text-green-600 text-center mb-4">Login</h3>
    <hr className="border-t-2 border-green-400 mb-6 w-2/3 mx-auto" />

    <form className="space-y-6" onSubmit={handleLogin}>
      <div>
        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="text"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition duration-300"
      >
        Login
      </button>
    </form>
  </div>
</div>

  );
};

export default Login;
