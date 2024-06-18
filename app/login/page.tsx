"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Handle form submission. Login user.
   * @param e 
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });
      
      const token = response.data.successResult.token;
      localStorage.setItem('token', token);
      axios.defaults.headers.Authorization = `Bearer ${token}`;

      router.push('/expenses');
    } catch (err) {
      console.error('Login failed', err);
      setError('Login failed. Please check your credentials and try again.');
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white text-black p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-10 text-center text-black">Welcome to Expenses manager</h2>
          <h2 className="text-1xl font-bold mb-6 text-center text-black">Login</h2>
          <form onSubmit={handleSubmit}>
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
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don&apos;t have an account? <a href="/register" className="text-blue-500">Register</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
