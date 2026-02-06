import React, { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

const TransactionModal = ({ isOpen, onClose, onSubmit, accounts, initialData }) => {
  const isEdit = Boolean(initialData);
  const [activeTab, setActiveTab] = useState("income");
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "Salary",
    division: "Personal",
    date: new Date().toISOString().slice(0, 16),
    accountId: "",
  });

  useEffect(() => {
    if (!isOpen) return;
    if (initialData) {
      setActiveTab(initialData.type);
      setFormData({
        amount: initialData.amount || "",
        description: initialData.description || "",
        category: initialData.category || "Other",
        division: initialData.division || "Personal",
        date: initialData.date ? new Date(initialData.date).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
        accountId: initialData.accountId || "",
      });
      return;
    }

    setActiveTab("income");
    setFormData({
      amount: "",
      description: "",
      category: "Salary",
      division: "Personal",
      date: new Date().toISOString().slice(0, 16),
      accountId: "",
    });
  }, [initialData, isOpen]);

  const categories = useMemo(
    () =>
      activeTab === "income"
        ? ["Salary", "Bonus", "Interest", "Other"]
        : ["Fuel", "Movie", "Food", "Loan", "Medical", "Rent", "Shopping", "Travel"],
    [activeTab]
  );

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.accountId) {
      alert("Please select an account.");
      return;
    }
    if (!formData.amount || Number(formData.amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const payload = {
      ...formData,
      amount: Number(formData.amount), // Convert string to Number
      type: activeTab,
    };

    onSubmit(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{isEdit ? "Edit Transaction" : "Add Transaction"}</h2>
          <button onClick={onClose}><X size={24} /></button>
        </div>

        {/* Tabs */}
        <div className="flex mb-4 border-b">
          <button
            className={`flex-1 py-2 ${activeTab === 'income' ? 'border-b-2 border-green-500 text-green-600 font-bold' : 'text-gray-500'}`}
            onClick={() => setActiveTab('income')}
            disabled={isEdit}
          >
            Income
          </button>
          <button
            className={`flex-1 py-2 ${activeTab === 'expense' ? 'border-b-2 border-red-500 text-red-600 font-bold' : 'text-gray-500'}`}
            onClick={() => setActiveTab('expense')}
            disabled={isEdit}
          >
            Expense
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date & Time</label>
            <input
              type="datetime-local"
              required
              className="mt-1 block w-full border rounded-md p-2"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Account</label>
            <select
              required
              className="mt-1 block w-full border rounded-md p-2"
              value={formData.accountId}
              onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
              disabled={isEdit}
            >
              <option value="">Select Account</option>
              {accounts && accounts.map(acc => (
                <option key={acc._id} value={acc._id}>{acc.name} (₹{acc.balance})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              required
              min="0"
              className="mt-1 block w-full border rounded-md p-2"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              className="mt-1 block w-full border rounded-md p-2"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Division</label>
            <div className="flex space-x-4 mt-1">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Personal"
                  checked={formData.division === 'Personal'}
                  onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                  className="mr-2"
                />
                Personal
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Office"
                  checked={formData.division === 'Office'}
                  onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                  className="mr-2"
                />
                Office
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              maxLength="100"
              placeholder="One line description"
              className="mt-1 block w-full border rounded-md p-2"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white font-bold ${activeTab === 'income' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
          >
            {isEdit ? "Save Changes" : `Add ${activeTab === "income" ? "Income" : "Expense"}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;