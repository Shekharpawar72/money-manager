import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Money Manager?",
    answer:
      "Money Manager is a smart money management platform that helps you track income, manage expenses, and understand your spending habits with visual insights.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Yes. Your data is securely stored and protected using modern security practices. We never share your financial information with third parties.",
  },
  {
    question: "Can I track both income and expenses?",
    answer:
      "Absolutely. You can add income and expense transactions separately and view detailed summaries on your dashboard.",
  },
  {
    question: "Does Budget Atlas support multiple accounts?",
    answer:
      "Yes. You can create and manage multiple accounts such as cash, bank, or digital wallets in one place.",
  },
  {
    question: "Can I filter transactions by date or category?",
    answer:
      "Yes. You can filter transactions by date range, category, division, and transaction type to analyze your spending better.",
  },
  {
    question: "Is Budget Atlas free to use?",
    answer:
      "Yes, Budget Atlas offers essential features for free so you can start managing your finances without any cost.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className=" py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Heading */}
        <h2 className="mb-12 text-center text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Frequently Asked{" "}
          <span className="text-emerald-600">Questions</span>
        </h2>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/60 bg-white/90 shadow-md transition"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-sm font-semibold text-slate-900 sm:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-emerald-600 transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeIndex === index && (
                <div className="px-6 pb-5 text-sm text-slate-600 sm:text-base">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
