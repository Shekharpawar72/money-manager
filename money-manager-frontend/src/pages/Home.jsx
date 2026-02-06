import React, { useEffect, useMemo, useState } from "react";
import {
  addTransaction,
  editTransaction,
  getAccounts,
  getCategorySummary,
  getDashboardData,
  getTransactions,
} from "../services/api";
import DashboardCharts from "../components/DashboardChart.jsx";
import TransactionModal from "../components/TransactionModal.jsx";
import moment from "moment";
import { ArrowUpRight, Filter, Plus } from "lucide-react";
import { toast } from "react-toastify";

const periodLabels = {
  week: (value) => `W${value}`,
  month: (value) =>
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][value - 1] || "Month",
  year: (value) => String(value),
};

const Home = () => {
  const [reportRaw, setReportRaw] = useState([]);
  const [categorySummary, setCategorySummary] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [timeFrame, setTimeFrame] = useState("month");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const [filters, setFilters] = useState({
    start: "",
    end: "",
    category: "",
    division: "",
    type: "",
  });

  const reportData = useMemo(() => {
    const buckets = new Map();

    reportRaw.forEach((item) => {
      const periodValue = item?._id?.period;
      const type = item?._id?.type;
      if (!periodValue || !type) return;
      if (!buckets.has(periodValue)) {
        buckets.set(periodValue, { name: periodLabels[timeFrame](periodValue), income: 0, expense: 0 });
      }
      const bucket = buckets.get(periodValue);
      bucket[type] = item.total;
    });

    return Array.from(buckets.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([, value]) => value);
  }, [reportRaw, timeFrame]);

  const totals = useMemo(() => {
    return reportData.reduce(
      (acc, item) => {
        acc.income += item.income || 0;
        acc.expense += item.expense || 0;
        return acc;
      },
      { income: 0, expense: 0 }
    );
  }, [reportData]);

  useEffect(() => {
    loadAccounts();
  }, []);

  useEffect(() => {
    fetchDashboardAndTransactions();
  }, [timeFrame, filters]);

  const loadAccounts = async () => {
    try {
      const res = await getAccounts();
      setAccounts(res.data || []);
    } catch (err) {
      console.error("Failed to load accounts:", err);
    }
  };

  const fetchDashboardAndTransactions = async () => {
    try {
      const query = {
        start: filters.start || undefined,
        end: filters.end || undefined,
        category: filters.category || undefined,
        division: filters.division || undefined,
        type: filters.type || undefined,
      };

      const [dashRes, transRes, summaryRes] = await Promise.all([
        getDashboardData(timeFrame),
        getTransactions(query),
        getCategorySummary(),
      ]);
      setReportRaw(dashRes.data || []);
      setTransactions(transRes.data || []);
      setCategorySummary(summaryRes.data || []);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    }
  };

  const handleAddTransaction = async (data) => {
    try {
      await addTransaction(data);
      toast.success("Transaction added successfully");
      fetchDashboardAndTransactions();
      loadAccounts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add transaction");
    }
  };

  const handleUpdateTransaction = async (data) => {
    if (!editingTransaction) return;
    try {
      await editTransaction(editingTransaction._id, data);
      toast.success("Transaction updated");
      setEditingTransaction(null);
      fetchDashboardAndTransactions();
      loadAccounts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update transaction");
    }
  };

  const startEdit = (transaction) => {
    const hoursDiff = moment().diff(moment(transaction.createdAt || transaction.date), "hours");
    if (hoursDiff > 12) {
      toast.error("Editing restricted after 12 hours");
      return;
    }
    setEditingTransaction(transaction);
  };

  const accountNameLookup = useMemo(() => {
    return accounts.reduce((acc, account) => {
      acc[account._id] = account.name;
      return acc;
    }, {});
  }, [accounts]);

  return (
    <div className="space-y-10 py-8">
      <section className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/90 via-amber-50 to-orange-100 p-6 shadow-xl shadow-amber-200/60">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">Dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">Your spending universe, mapped.</h1>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Track cashflow, watch categories, and keep every account in sync with your real balances.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
              className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
            >
              <Plus size={18} /> Add transaction
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white/90 p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Income</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-600">₹{totals.income.toFixed(2)}</p>
          </div>
          <div className="rounded-2xl bg-white/90 p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Expense</p>
            <p className="mt-2 text-2xl font-semibold text-orange-500">₹{totals.expense.toFixed(2)}</p>
          </div>
          <div className="rounded-2xl bg-white/90 p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Net</p>
            <p className={`mt-2 text-2xl font-semibold ${totals.income - totals.expense >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
              ₹{(totals.income - totals.expense).toFixed(2)}
            </p>
          </div>
          <div className="rounded-2xl bg-white/90 p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Accounts</p>
            <p className="mt-2 text-2xl font-semibold text-slate-800">{accounts.length}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <DashboardCharts data={reportData} timeFrame={timeFrame} />
        <div className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-lg shadow-amber-100/60">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Top categories</h3>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Expense</span>
          </div>
          <div className="mt-4 space-y-3">
            {categorySummary.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
                No expense categories yet.
              </div>
            ) : (
              categorySummary.map((item) => (
                <div key={item._id} className="flex items-center justify-between rounded-xl bg-white/90 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{item._id}</p>
                    <p className="text-xs text-slate-500">Expense category</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">₹{item.total.toFixed(2)}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-xl shadow-amber-100/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-800">Transaction history</h3>
            <p className="text-sm text-slate-500">Filter by time, division, category, or type.</p>
          </div>
          <button
            onClick={() => setFilters({ start: "", end: "", category: "", division: "", type: "" })}
            className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-slate-300"
          >
            <Filter size={16} /> Clear filters
          </button>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-5">
          <input
            type="date"
            className="rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm"
            value={filters.start}
            onChange={(e) => setFilters({ ...filters, start: e.target.value })}
          />
          <input
            type="date"
            className="rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm"
            value={filters.end}
            onChange={(e) => setFilters({ ...filters, end: e.target.value })}
          />
          <select
            className="rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm"
            value={filters.division}
            onChange={(e) => setFilters({ ...filters, division: e.target.value })}
          >
            <option value="">All divisions</option>
            <option value="Personal">Personal</option>
            <option value="Office">Office</option>
          </select>
          <select
            className="rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">All categories</option>
            <option value="Fuel">Fuel</option>
            <option value="Food">Food</option>
            <option value="Medical">Medical</option>
            <option value="Rent">Rent</option>
            <option value="Travel">Travel</option>
          </select>
          <select
            className="rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-sm"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Description</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Account</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Division</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white/90">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-6 text-center text-sm text-slate-500">
                    No transactions match these filters yet.
                  </td>
                </tr>
              ) : (
                transactions.map((t) => {
                  const hoursDiff = moment().diff(moment(t.createdAt || t.date), "hours");
                  return (
                    <tr key={t._id}>
                      <td className="px-4 py-3 text-sm text-slate-500">
                        {moment(t.date).format("MMM Do, h:mm a")}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-900">{t.description}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                          {t.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-500">
                        {accountNameLookup[t.accountId] || "Account"}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-500">{t.division}</td>
                      <td className={`px-4 py-3 text-sm font-semibold ${t.type === "income" ? "text-emerald-600" : "text-orange-600"}`}>
                        {t.type === "income" ? "+" : "-"} ₹{t.amount}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">
                        <button
                          onClick={() => startEdit(t)}
                          className={`inline-flex items-center gap-1 text-sm font-semibold ${hoursDiff > 12 ? "text-slate-300" : "text-slate-800 hover:text-slate-900"}`}
                          disabled={hoursDiff > 12}
                        >
                          Edit <ArrowUpRight size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTransaction}
        accounts={accounts}
      />

      <TransactionModal
        isOpen={Boolean(editingTransaction)}
        onClose={() => setEditingTransaction(null)}
        onSubmit={handleUpdateTransaction}
        accounts={accounts}
        initialData={editingTransaction}
      />
    </div>
  );
};

export default Home;