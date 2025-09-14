import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, ShieldAlert, Menu, X } from "lucide-react";

const Sidebar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Boshqaruv paneli", icon: <Home className="w-5 h-5" /> },
    {
      to: "/fraudster",
      label: "Firibgar qo'shish",
      icon: <ShieldAlert className="w-5 h-5" />,
    },
    {
      to: "/user",
      label: "Foydalanuvchilar",
      icon: <User className="w-5 h-5" />,
    },
    { to: "/profile", label: "Profil", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div>
      {/* 🔘 Mobile menu tugmasi */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 right-4 z-50 bg-gray-800 text-white p-2 rounded-lg shadow-md"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* ✅ Desktop sidebar (doim chapda) */}
      <div className="hidden lg:flex w-60 bg-gray-900 text-white h-[calc(100vh-56px)] p-4 flex-col gap-2">
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

      {/* ✅ Mobile menyu (tepadan tushadi) */}
      <div
        className={`fixed top-0 left-0 w-full bg-gray-900 text-white shadow-lg transform transition-transform duration-300 z-50 lg:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold">Menyu</h2>
          <button onClick={() => setOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Linklar */}
        <div className="flex flex-col p-4 gap-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
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
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
