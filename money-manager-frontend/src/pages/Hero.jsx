import React from "react";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Features from "./Features";
 import FAQ from "./FAQ";
 import Contact from "./Contactus";
 import Footer from "./Footer";

const Hero = () => {
  return (
    <>
      <section className="relative  flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden  px-4">
        
        {/* Soft background blobs */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full   blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full  blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            <TrendingUp size={16} />
            Track. Analyze. Save.
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Take Control of Your{" "}
            <span className="text-emerald-600">Financial Future</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-600 sm:text-lg">
            Track income, manage expenses, and build better budgets with our
            intuitive money management app. Simple, secure, and always accessible.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          

            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:bg-amber-200 hover:text-black"
            >
              View Dashboard <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        
      </section>
      <Features />
      <FAQ />
        <Contact />
         <Footer />
    </>
  );
};

export default Hero;
