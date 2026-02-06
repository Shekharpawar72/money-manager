import React from "react";
import { Mail, Phone, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-white/90 via-emerald-50 to-emerald-100 border-t border-white/60">
      
      {/* FULL WIDTH CONTAINER */}
      <div className="w-full px-6 py-14">
        
        {/* GRID */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* BRAND */}
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Money <span className="text-emerald-600">Manager</span>
            </h3>
            <p className="mt-4 max-w-xs text-sm text-slate-600">
              Take control of your finances. Track income, manage expenses, and
              build smarter budgets with ease.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/hero" className="text-slate-600 hover:text-emerald-600">Home</Link></li>
              <li><Link to="/" className="text-slate-600 hover:text-emerald-600">Dashboard</Link></li>
              <li><Link to="/accounts" className="text-slate-600 hover:text-emerald-600">Accounts</Link></li>
              <li><Link to="/signup" className="text-slate-600 hover:text-emerald-600">Sign Up</Link></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Support
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>FAQs</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Help Center</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Contact
            </h4>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-emerald-600" />
                <span>moneymanager@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-emerald-600" />
                <span>+91 99962564xx</span>
              </div>
              <div className="mt-4 flex gap-4">
                <Github size={18} className="hover:text-emerald-600 cursor-pointer" />
                <Linkedin size={18} className="hover:text-emerald-600 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/60 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © 2026 Money Manager. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Built with ❤️ using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
