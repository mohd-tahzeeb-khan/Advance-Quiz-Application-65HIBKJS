'use client'
import { useState } from "react";
import config from "../../../next.config.mjs"
import axios from "axios";

const signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender:"",
    mobile:"",
    city:"",
    state:"",
    zip:""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSuccess("Signup successful! You can now log in.");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during signup.");
    }
  };

  return (
    <div className=" h-[100vh] w-full flex justify-center items-center gap-4">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3 mt-2 items-end">
          <label htmlFor="name">Name:</label>
          <input className="text-black"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex gap-3 mt-2 items-end">
          <label htmlFor="email">Email:</label>
          <input className="text-black"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex gap-3 mt-2 items-end">
          <label htmlFor="password">Password:</label>
          <input className="text-black"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex gap-3 mt-2 items-end">
          <label htmlFor="gender">Gender:</label>
          <input className="text-black"
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex gap-3 mt-2 items-end">
          <label htmlFor="mobile">Mobile:</label>
          <input className="text-black"
            type="number"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex gap-3 mt-2 items-end">
          <label htmlFor="city">City:</label>
          <input className="text-black"
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex gap-3 mt-2 items-end">
          <label htmlFor="state">State:</label>
          <input className="text-black"
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex gap-3 mt-2 items-end">
          <label htmlFor="zip">Zip Code:</label>
          <input className="text-black"
            type="number"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            required
          />
        </div>
        <button className="bg-green-500 border-2 border-white" type="submit">Signup</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default signup;
