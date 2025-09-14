import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/Login";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Search from "./pages/Search/Search";
import User from "./pages/User/User";
import Fraudster from "./pages/Fraudster/Fraudster";
import Profile from "./pages/Profile/Profile";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              {/* butun sahifa flex qilib olindi */}
              <div className="flex flex-col min-h-screen bg-gray-950 text-white">
                <Navbar />

                <div className="flex flex-1 overflow-hidden">
                  <Sidebar />

                  {/* scroll faqat content qismida ishlaydi */}
                  <div className="flex-1 p-6 overflow-y-auto">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/search" element={<Search />} />
                      <Route path="/user" element={<User />} />
                      <Route path="/fraudster" element={<Fraudster />} />
                      <Route path="/profile" element={<Profile />} />
                    </Routes>
                  </div>
                </div>

                {/* Pastda Footer */}
                <Footer />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
