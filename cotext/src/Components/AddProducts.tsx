import React, { useState,useEffect } from "react";
import axios from 'axios'
import { Link, Outlet } from "react-router-dom";
import { FileTextIcon, PlusCircleIcon, XIcon, SearchIcon } from 'lucide-react';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const[idnum,setidnum]=useState(0)
  interface Product {
    id: number;
    name: string;
    doc: string;
    price: number;  // Changed from 'Number' to 'number'
    image:string;
    Category:string;
    Quantity:string
    status:string;
  }
  
  interface ApiResponse {
    isSuccess: boolean;
    result: Product[];  // result is an array of Product
  }
  
  const [products, setProducts] = useState<Product[]>([]); // Initialize as array or null
  
    useEffect(() => {
    axios
      .get<ApiResponse>('http://localhost:3000/products/get')
      .then((res) => {
        const rawData = res.data.result; // Assuming the result field contains the object
        console.log('Raw API Response:', rawData);
        while (idnum < products.length) {
          setidnum( idnum + 1);
        }        if (rawData && typeof rawData === 'object') {
          // Convert object to array
          const productsArray = Object.values(rawData);
          setProducts(productsArray);
        } else {
          console.error('Unexpected API response structure:', rawData);
          setProducts([]); // Set an empty array if the structure is unexpected
        }
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setProducts([]); // Handle errors by clearing the products
      });
  }, []);
  






  const orders = [
    { id: "ORD001", customer: "John Doe", date: "2023-05-15", total: 125.99, status: "Completed" },
    { id: "ORD002", customer: "Jane Smith", date: "2023-05-14", total: 89.50, status: "Processing" },
    { id: "ORD003", customer: "Bob Johnson", date: "2023-05-13", total: 237.00, status: "Shipped" },
    { id: "ORD004", customer: "Alice Brown", date: "2023-05-12", total: 52.25, status: "Cancelled" },
    { id: "ORD005", customer: "Charlie Davis", date: "2023-05-11", total: 175.75, status: "Completed" },
  ];

  // const filteredOrders = products.filter(order => 
  //   order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="   w-screen  ">
      {/* Sidebar */}
     

      {/* Main Content */}
      <main className="flex-grow bg-gray-200 p-6 rounded-lg  ">
        <header className="bg-white shadow-md p-4 mb-6 rounded-lg ">
          <div className="flex justify-between items-center ">
            <h1 className="text-2xl font-bold text-gray-800 ">Products</h1>
            <button
              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
            >
              <PlusCircleIcon className="h-5 w-5" />
              <span>Report New</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
            <p className="text-gray-600">Total Sales: $125,000</p>
            <p className="text-gray-600">Orders: 1,234</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Inventory Status</h2>
            <p className="text-gray-600">Total Items: 5,678</p>
            <p className="text-gray-600">Low Stock Items: 23</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Customer Insights</h2>
            <p className="text-gray-600">Total Customers: 10,000</p>
            <p className="text-gray-600">New This Month: 250</p>
          </div>
        </div>

        {/* Beautiful and Professional Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
          </div>
          <div className="p-4">
            <div className="flex mb-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <th className="px-4 py-3">Product ID</th>
                    <th className="px-4 py-3">Product Name</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>

                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{idnum}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{order.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{order.Category}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{order.price}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{order.Quantity}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{order.status}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{order.status}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {/* <div className="text-sm text-gray-900">${order.total.toFixed(2)}</div> */}
                      </td>
                      {/* <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;

