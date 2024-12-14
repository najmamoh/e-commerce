import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FaBox, FaChartBar, FaUsers } from "react-icons/fa";
import Kow from './kow'
type DashboardLayoutProps = {
  children: ReactNode; // Explicitly define children prop type
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const data = [
    { name: "Jan", total: 8000 },
    { name: "Feb", total: 3000 },
    { name: "Mar", total: 5000 },
    { name: "Apr", total: 2500 },
  ];

  return (
    <div className="flex bg-gray-100 h-screen">
      {/* Sidebar */}
      <div className="w-72 text-gray-800 shadow-md h-screen">
        <div className="p-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="border-b border-stone-800 w-64 mt-6 rounded-xl"></div>
        </div>
        <nav className="mt-10 space-y-4">
          <Link
            to="/admin"
            className="flex items-center font-semibold bg-white gap-4 py-3 px-6 text-lg hover:bg-gray-700 hover:text-white rounded-lg transition"
          >
            <FaBox className="text-gray-800" />
            Dashboard
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center font-semibold gap-4 py-3 px-6 text-lg hover:bg-gray-700 hover:text-white rounded-lg transition"
          >
            <FaBox className="text-gray-800" />
            Products
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center font-semibold gap-4 py-3 px-6 text-lg hover:bg-gray-700 hover:text-white rounded-lg transition"
          >
            <FaUsers className="text-gray-800" />
            Orders
          </Link>
          <Link
            to="/admin/reports"
            className="flex items-center font-semibold gap-4 py-3 px-6 text-lg hover:bg-gray-700 hover:text-white rounded-lg transition"
          >
            <FaChartBar className="text-gray-800" />
            Reports
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center font-semibold gap-4 py-3 px-6 text-lg hover:bg-gray-700 hover:text-white rounded-lg transition"
          >
            <FaUsers className="text-gray-800" />
            Users
          </Link>
          <Link
            to="/admin/settings"
            className="flex items-center font-semibold gap-4 py-3 px-6 text-lg hover:bg-gray-700 hover:text-white rounded-lg transition"
          >
            <FaUsers className="text-gray-800" />
            Settings
          </Link>
          <Link
            to="/logout"
            className="flex items-center font-semibold gap-4 py-3 px-6 text-lg hover:bg-gray-700 hover:text-white rounded-lg transition"
          >
            <FaChartBar className="text-gray-800" />
            Logout
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <main className="p-6 bg-slate-100 w-full">
        {/* <Kow/> */}
        {children} {/* Render children passed to the layout */}
      </main>
    </div>
  );
};

export default DashboardLayout;
