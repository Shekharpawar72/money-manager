import React from "react";
import { PieChart, ShieldCheck, Zap, BarChart3 } from "lucide-react";

const features = [
  {
    title: "Smart Analytics",
    description:
      "Visualize your spending patterns with intuitive charts and insights.",
    icon: PieChart,
  },
  {
    title: "Secure & Private",
    description:
      "Your financial data is encrypted and never shared with third parties.",
    icon: ShieldCheck,
  },
  {
    title: "Quick Entry",
    description:
      "Add transactions in seconds with our streamlined modal interface.",
    icon: Zap,
  },
  {
    title: "Budget Tracking",
    description:
      "Set budgets and track your progress with real-time notifications.",
    icon: BarChart3,
  },
];

const Features = () => {
  return (
    <section className=" py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-emerald-600 sm:text-4xl">
            Everything you need to manage money
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
            Powerful features designed to simplify your financial life and help
            you reach your goals faster.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="rounded-2xl bg-amber-50 border border-slate-200  p-6 shadow-lg transition hover:shadow-amber-200  hover:shadow-xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50">
                  <Icon className="h-7 w-7 text-emerald-600" />
                </div>

                <h3 className="text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
