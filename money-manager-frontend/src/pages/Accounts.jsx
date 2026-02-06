import React, { useEffect, useMemo, useState } from "react";
import { getAccounts, addAccount, transferAmount } from "../services/api";
import { toast } from "react-toastify";
import { ArrowRightLeft, Plus } from "lucide-react";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [transferData, setTransferData] = useState({ from: "", to: "", amount: 0 });
  const [newAccount, setNewAccount] = useState({ name: "", type: "Bank", balance: 0 });

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const res = await getAccounts();
      setAccounts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle Account Creation
  const handleAddAccount = async (e) => {
    e.preventDefault();
    try {
      await addAccount({ ...newAccount, balance: Number(newAccount.balance) });
      toast.success("Account created successfully");
      setNewAccount({ name: "", type: "Bank", balance: 0 });
      loadAccounts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create account");
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (transferData.from === transferData.to) return toast.error("Cannot transfer to same account");

    try {
      await transferAmount({
        fromAccountId: transferData.from,
        toAccountId: transferData.to,
        amount: Number(transferData.amount),
      });
      toast.success("Transfer successful");
      setTransferData({ from: "", to: "", amount: 0 });
      loadAccounts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Transfer failed");
    }
  };

  const totalBalance = useMemo(() => {
    return accounts.reduce((sum, account) => sum + (account.balance || 0), 0);
  }, [accounts]);

  return (
    <div className="space-y-10 py-8">
      <section className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/90 via-emerald-50 to-emerald-100 p-6 shadow-xl shadow-emerald-200/60">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-500">Accounts</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Every wallet, perfectly balanced.</h2>
            <p className="mt-2 text-sm text-slate-600">Current total across all accounts: ₹{totalBalance.toFixed(2)}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          <div className="rounded-2xl border border-dashed border-emerald-300 bg-white/90 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-700">Create new account</h3>
            <form onSubmit={handleAddAccount} className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Account name (e.g. HDFC)"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                required
                value={newAccount.name}
                onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
              />
              <select
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                value={newAccount.type}
                onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value })}
              >
                <option value="Bank">Bank</option>
                <option value="Mobile Wallet">Mobile Wallet</option>
                <option value="Cash">Cash</option>
                <option value="Investment">Investment</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="number"
                placeholder="Initial balance"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                required
                value={newAccount.balance}
                onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
              />
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700">
                <Plus size={16} /> Create account
              </button>
            </form>
          </div>

          {accounts.map((acc) => (
            <div key={acc._id} className="rounded-2xl bg-white/90 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{acc.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{acc.type}</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Active</span>
              </div>
              <p className="mt-4 text-3xl font-semibold text-emerald-600">₹{acc.balance}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/60 bg-white/90 p-6 shadow-lg shadow-emerald-100/60">
          <h3 className="text-lg font-semibold text-slate-800">Transfer funds</h3>
          <p className="text-sm text-slate-500">Move money between accounts without leaving this page.</p>
          {accounts.length > 1 ? (
            <form onSubmit={handleTransfer} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">From</label>
                <select
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={transferData.from}
                  onChange={(e) => setTransferData({ ...transferData, from: e.target.value })}
                  required
                >
                  <option value="">Select account</option>
                  {accounts.map((a) => (
                    <option key={a._id} value={a._id}>
                      {a.name} (₹{a.balance})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">To</label>
                <select
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={transferData.to}
                  onChange={(e) => setTransferData({ ...transferData, to: e.target.value })}
                  required
                >
                  <option value="">Select account</option>
                  {accounts.map((a) => (
                    <option key={a._id} value={a._id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Amount</label>
                <input
                  type="number"
                  placeholder="₹"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={transferData.amount}
                  onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
                  required
                />
              </div>
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800">
                <ArrowRightLeft size={16} /> Transfer now
              </button>
            </form>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
              Add at least two accounts to enable transfers.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Accounts;