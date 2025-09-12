import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, User, ShieldAlert } from "lucide-react"; // 🔥 iconlar

const Sidebar = () => {
  const { pathname } = useLocation();

  const links = [
    { to: "/", label: "Boshqaruv paneli", icon: <Home className="w-5 h-5" /> },
    { to: "/search", label: "Qidirish", icon: <Search className="w-5 h-5" /> },
    { to: "/fraudster", label: "Firibgar qo'shish", icon: <ShieldAlert className="w-5 h-5" /> },
    { to: "/user", label: "Foydalanuvchilar", icon: <User className="w-5 h-5" /> },
    { to: "/profile", label: "Profil", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="w-60 bg-gray-900 text-white h-[calc(100vh-56px)] p-4 flex flex-col gap-2">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
            pathname === link.to
              ? "bg-gray-700 text-white font-medium"
              : "text-gray-300 hover:bg-gray-800"
          }`}
        >
          {link.icon}
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default React.memo(Sidebar);
