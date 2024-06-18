"use client";

import React, { useState } from "react";
import Head from "next/head";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import Dialog from "@/components/Dialog";

const Login = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  /**
   * Handle form submission. Create a new user.
   * @param e
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/users", {
        firstName,
        lastName,
        email,
        password,
      });

      openDialog();
    } catch (err: any) {
      console.error("Login failed");
      if (err?.response?.status) {
        setError("Email already exists. Please try with a different email.");
      } else setError("Registration failed.");
    }

    setLoading(false);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title="Successfully created"
      >
        <p className="text-black">
          Your account has been created successfully. You will be redirected to
          login page.
        </p>
        <div className="flex justify-center">
          <button
            className="mt-4 px-4 py-2 bg-blue-500 rounded-md"
            onClick={closeDialog}
          >
            Close
          </button>
        </div>
      </Dialog>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white text-black p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-10 text-center text-black">
            Welcome to Expenses manager
          </h2>
          <h2 className="text-1xl mb-6 text-center text-black">
            Let&apos;s get started with creating an new account for you
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">First name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
              disabled={loading}
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
