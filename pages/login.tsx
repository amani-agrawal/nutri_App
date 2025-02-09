"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";
import clientPromise from "../lib/mongodb";
import { GetServerSideProps } from 'next';

const Login: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

interface User {
    _id: string;
    name: string;
    password: string;
 }
 
interface UserList {
    users: User[];
 }
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form from reloading the page

  };

  
  return (
    <div className="container-main">
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 style = {{color: "black"}}>Login</h2>

        <div className="input-group">
          <label htmlFor="email" style = {{color: "black"}}>Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label htmlFor="password" style = {{color: "black"}}>Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <button type="submit" className="login-button" onClick={() => router.push("/home")}>Login</button>
        <p>---- OR ----</p>
        <button type="button" className="register-button" onClick={() => router.push("/register")}>
          Register
        </button>
      </form>
    </div>
    </div>
  );
};

export default Login;
