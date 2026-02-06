import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { login } from "../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      // Assuming backend returns { token, user }
      loginUser(res.data.token, res.data.user); 
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-app px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl shadow-amber-200/50">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-500">Welcome back</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Sign in to Budget Atlas</h2>
        <p className="mt-2 text-sm text-slate-500">Track expenses and keep your accounts aligned.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-500">
          Don&apos;t have an account? <Link to="/signup" className="font-semibold text-slate-900">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;