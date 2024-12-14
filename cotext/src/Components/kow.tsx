import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
  } from "recharts";
  
    const data = [
      { name: "Jan", total: 4000 },
      { name: "Feb", total: 3000 },
      { name: "Mar", total: 5000 },
      { name: "Apr", total: 2500 },
    ];

function Dash() {
    return(
        <main className="flex-1 p-6 overflow-y-auto">
        <div>
          {/* Overview Header */}
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">Overview</h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-medium">Total Sales</h3>
              <p className="text-3xl font-bold">$14,000</p>
            </div>
            <div className="bg-gradient-to-r from-indigo-400 via-pink-500 to-red-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-medium">New Users</h3>
              <p className="text-3xl font-bold">1,250</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-medium">Active Projects</h3>
              <p className="text-3xl font-bold">24</p>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Monthly Sales
            </h3>
            <BarChart
              width={600}
              height={300}
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="total"
                fill="#4caf50"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </div>

          {/* Table */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              User Activity
            </h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-gray-600">Name</th>
                  <th className="py-2 px-4 text-gray-600">Email</th>
                  <th className="py-2 px-4 text-gray-600">Role</th>
                  <th className="py-2 px-4 text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="py-2 px-4">John Doe</td>
                  <td className="py-2 px-4">john@example.com</td>
                  <td className="py-2 px-4">Admin</td>
                  <td className="py-2 px-4 text-green-600">Active</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="py-2 px-4">Jane Smith</td>
                  <td className="py-2 px-4">jane@example.com</td>
                  <td className="py-2 px-4">Editor</td>
                  <td className="py-2 px-4 text-yellow-600">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    )
}

export default Dash