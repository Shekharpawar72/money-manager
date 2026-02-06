// import React, { useContext } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { LogOut, Wallet } from "lucide-react";

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <nav className="sticky top-0 z-40 border-b border-white/20 bg-white/70 backdrop-blur">
//       <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
//         <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-slate-900">
//           <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-slate-900">
//             <Wallet size={10} />
//           </span>
//           <span className="tracking-tight">MM</span>
//         </Link>

//         {user ? (
//           <div className="flex items-center gap-6">
//            <NavLink
//   to="/hero"
//   className={({ isActive }) =>
//     `text-sm font-medium ${
//       isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-800"
//     }`
//   }
// >
//   Home
// </NavLink>

//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `text-sm font-medium ${isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-800"}`
//               }
//             >
//               Dashboard
//             </NavLink>
//             <NavLink
//               to="/accounts"
//               className={({ isActive }) =>
//                 `text-sm font-medium ${isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-800"}`
//               }
//             >
//               Accounts
//             </NavLink>
//             <div className="flex items-center gap-3 rounded-full bg-white/80 px-3 py-1 shadow-sm">
//               <span className="text-sm font-semibold text-slate-800">{user.name}</span>
//               <button
//                 onClick={logout}
//                 className="rounded-full bg-rose-100 p-2 text-rose-600 transition hover:bg-rose-200"
//                 aria-label="Log out"
//               >
//                 <LogOut size={6} />
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="flex gap-3">
//             <Link to="/login" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800">
//               Sign In
//             </Link>
//             <Link
//               to="/signup"
//               className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800"
//             >
//               Sign Up
//             </Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LogOut, Wallet, Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-white/20 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-semibold text-slate-900"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-slate-900">
            <Wallet size={18} />
          </span>
          <span className="tracking-tight">MM</span>
        </Link>

        {/* ===== Desktop Menu ===== */}
        {user && (
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/hero"
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-800"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-800"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/accounts"
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-800"
                }`
              }
            >
              Accounts
            </NavLink>

            <div className="flex items-center gap-3 rounded-full bg-white/80 px-3 py-1 shadow-sm">
              <span className="text-sm font-semibold text-slate-800">
                {user.name}
              </span>
              <button
                onClick={logout}
                className="rounded-full bg-rose-100 p-2 text-rose-600 transition hover:bg-rose-200"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ===== Auth Buttons (Desktop) ===== */}
        {!user && (
          <div className="hidden md:flex gap-3">
            <Link
              to="/login"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800"
            >
              Sign Up
            </Link>
          </div>
        )}

        {/* ===== Mobile Menu Button ===== */}
        <button
          className="md:hidden rounded-lg bg-slate-100 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ===== Mobile Dropdown ===== */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-4">
          {user ? (
            <>
              <NavLink
                to="/hero"
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-medium text-slate-700"
              >
                Home
              </NavLink>

              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-medium text-slate-700"
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/accounts"
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-medium text-slate-700"
              >
                Accounts
              </NavLink>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-semibold">{user.name}</span>
                <button
                  onClick={logout}
                  className="rounded-full bg-rose-100 p-2 text-rose-600"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-white"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-white"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;







