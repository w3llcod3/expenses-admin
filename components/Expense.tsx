"use client";

import axios from "@/lib/axios";
import dayjs from "dayjs"
import React, { useState } from "react";

interface ExpenseProps {
  initialData?: ExpenseData;
  onClose: () => void;
}

interface ExpenseData {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string;
}

const Expense = ({ initialData, onClose }: ExpenseProps) => {
  const [id, setId] = useState(initialData?.id || 0);
  const [amount, setAmount] = useState(initialData?.amount || 0);
  const [category, setCategory] = useState(initialData?.category || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [date, setDate] = useState(initialData?.date || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let method = "";
    let payload = {};
    if (id) {
      payload = { id, amount, category, description, date: dayjs(date).toISOString() };
      method = "PATCH";
    } else {
      payload = { amount, category, description, date: dayjs(date).toISOString() };
      method = "POST";
    }

    const res = await axios({
      method,
      url: "/api/expenses",
      data: payload,
    });

    if (res.status === 200) {
      console.log("Expense added successfully");
      onClose()
    } else if (res.status === 201) {
      console.log("Expense updated successfully");
      onClose()
    } else {
      console.error("Failed to add/update expense");
    }
  };

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white rounded-md text-black"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="amount">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="category"
        >
          Category
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        {initialData?.id ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
};

export default Expense;
