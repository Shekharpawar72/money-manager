import React, { useState } from "react";
import { signup } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      toast.success("Account created! Please login.");
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-app px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl shadow-emerald-200/50">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-500">Get started</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Create your Budget Atlas</h2>
        <p className="mt-2 text-sm text-slate-500">One account to organize all your spending.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Password</label>
            <input
              type="password"
              required
              className="mt-1 block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button type="submit" className="w-full rounded-xl bg-slate-900 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800">
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-500">
          Already have an account? <Link to="/login" className="font-semibold text-slate-900">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;