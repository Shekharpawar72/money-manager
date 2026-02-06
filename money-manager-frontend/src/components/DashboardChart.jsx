import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardCharts = ({ data, timeFrame }) => {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-lg shadow-amber-100/60">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold capitalize text-slate-800">
          {timeFrame} Income vs Expense
        </h3>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Flow
        </span>
      </div>
      <div className="h-80">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-500">
            No report data for this period yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fill: "#64748B", fontSize: 12 }} />
              <YAxis tick={{ fill: "#64748B", fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#22C55E" name="Income" radius={[6, 6, 0, 0]} />
              <Bar dataKey="expense" fill="#F97316" name="Expense" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default DashboardCharts;