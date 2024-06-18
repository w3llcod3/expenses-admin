"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Head from "next/head";
import dayjs from "dayjs";
import Dialog from "@/components/Dialog";
import Expense from "@/components/Expense";

interface Expense {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
}

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [initialData, setInitialData] = useState<Expense | undefined>(
    undefined
  );

  /**
   * Fetch expenses from the server.
   */
  const fetchExpenses = async () => {
    try {
      const response = await axios.get("/api/expenses");
      setExpenses(response.data.successResult.items);
    } catch (err) {
      setError("Failed to fetch expenses.");
    }
  };

  /**
   * Delete an expense.
   * @param id 
   */
  const deleteExpense = async (id: number) => {
    try {
      const response = await axios.delete(`/api/expenses?id=${id}`);
      fetchExpenses();
    } catch (err) {
      setError("Failed to delete expense.");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const openDialog = () => {
    setInitialData({
      id: 0,
      date: "",
      category: "",
      description: "",
      amount: 0,
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Head>
        <title>Expenses</title>
      </Head>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl text-black font-bold mb-6">Expenses</h1>
          <div className="flex justify-end py-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={openDialog}
            >
              Add new expense
            </button>
            <Dialog isOpen={isDialogOpen} onClose={closeDialog} title="Expense">
              <Expense
                initialData={initialData}
                onClose={() => {
                  closeDialog();
                  setInitialData(undefined);
                  fetchExpenses();
                }}
              />
              <button
                className="mt-4 px-4 py-2 rounded-md"
                onClick={closeDialog}
              >
                Close
              </button>
            </Dialog>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <div className="bg-white text-black shadow-md rounded-lg overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {dayjs(expense.date).format("MMM D, YYYY")}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {expense.category}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {expense.description}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {expense.amount.toFixed(2) + " AED"}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        onClick={() => {
                          setInitialData(expense);
                          setIsDialogOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md"
                        onClick={() => deleteExpense(expense.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Expenses;
