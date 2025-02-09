"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import "./register.css";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  height: number; // in cm
  weight: number; // in kg
  gender: string;
}

const Register: React.FC = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: 0,
    height: 0,
    weight: 0,
    gender: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: name === "age" || name === "height" || name === "weight" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
  
    if (formData.age === 0 || formData.height === 0 || formData.weight === 0) {
      setError("Age, Height, or Weight cannot be 0.");
      return;
    }
  
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
      } else {
        alert("Registration Successful!");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
      <h2 style={{ color: 'black' }}>Register</h2>


        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label className="input-label" htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} style={{ color: 'black' }}required />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} style={{ color: 'black' }} required />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} style={{ color: 'black' }} required />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} style={{ color: 'black' }} required />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="age">Age</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} style={{ color: 'black' }} required />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="height">Height (cm)</label>
          <input type="number" id="height" name="height" value={formData.height} onChange={handleChange} style={{ color: 'black' }} required />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="weight">Weight (kg)</label>
          <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} style={{ color: 'black' }} required />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="gender">Gender</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange} style={{ color: 'black' }} required>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;