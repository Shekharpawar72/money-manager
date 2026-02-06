import React from "react";
import { Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section className="relative overflow-hidden  py-20 text-slate-900">
      
      {/* Background big text */}
      

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Top heading */}
        <div className="mb-16 flex items-center justify-center gap-6">
          <span className="h-px w-20 bg-emerald-500" />
          <h2 className="text-7xl font-bold uppercase tracking-widest text-emerald-700">
            Get In Touch
          </h2>
          <span className="h-px w-20 bg-emerald-500" />
        </div>

        {/* Content */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          
          {/* LEFT CONTENT */}
          <div>
            <h3 className="text-4xl font-extrabold">
              DON&apos;T BE{" "}
              <span className="text-emerald-700 text-6xl">SHY</span> 👋
            </h3>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
              I&apos;m always happy to connect! Whether it&apos;s a new project,
              collaboration, or just to say hello, feel free to reach out.
              Let&apos;s create something amazing together.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 hover:scale-120 transition-transform hover:shadow-lg hover:shadow-emerald-300">
                  <Mail />
                </div>
                <div>
                  <p className="text-sm font-semibold">Mail Me</p>
                  <p className="text-sm text-slate-600">
                    moneymanager@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Phone />
                </div>
                <div>
                  <p className="text-sm font-semibold">Call Me</p>
                  <p className="text-sm text-slate-600">+91 99962564xx</p>
                </div> 
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="relative rounded-2xl border border-white/60 bg-white/90 p-6 shadow-xl shadow-emerald-200/60 sm:p-8">
            
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Enter your Name"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <input
                type="email"
                placeholder="Enter a valid Email Address"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <select
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>Select Purpose</option>
                <option>Project</option>
                <option>Collaboration</option>
                <option>General Inquiry</option>
              </select>

              <textarea
                rows="4"
                placeholder="Enter your Message"
                className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-700"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
