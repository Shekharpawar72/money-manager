// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import Home from "./pages/Home";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import Accounts from "./pages/Accounts";
// import Navbar from "./components/Navbar";
// import ProtectedRoute from "./components/ProtectedRoute";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <div className="min-h-screen bg-app text-slate-900">
//           <Navbar />
//           <main className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
//             <Routes>
        
//               <Route
//                 path="/"
//                 element={
//                   <ProtectedRoute>
//                     <Home />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/accounts"
//                 element={
//                   <ProtectedRoute>
//                     <Accounts />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />
//             </Routes>
//           </main>
//           <ToastContainer />
//         </div>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }

// export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Accounts from "./pages/Accounts";
import Hero from "./pages/Hero";
import Features from "./pages/Features";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-app text-slate-900">
          <Navbar />

          <main className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
            <Routes>

              {/* Hero / Landing Page */}
              <Route path="/hero" element={<Hero />} />
              <Route path="/features" element={<Features />} />


              {/* Dashboard (Protected) */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />

              {/* Accounts */}
              <Route
                path="/accounts"
                element={
                  <ProtectedRoute>
                    <Accounts />
                  </ProtectedRoute>
                }
              />

              {/* Auth */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

            </Routes>
          </main>

          <ToastContainer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

