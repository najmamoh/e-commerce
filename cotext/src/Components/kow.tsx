import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Redux/Slice/Products/GetProductsSlice";
import { RootState,AppDispatch } from "../Redux/Store";
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  doc?: string;
  rating?: number;
}
function Dash() {
  const dispatch = useDispatch<AppDispatch>(); // ✅ Tell useDispatch the correct type
  const { data: products, isLoading, isError, errorMsg,data } = useSelector(
    (state: RootState) => state.getAllProducts
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const productArray: Product[] = Array.isArray(data) ? data : Object.values(data || {});

  const chartData = products.map((product) => ({
    name: product.name,
    total: product.price,
  }));

  return (
    <main className="flex-1 p-6">
      <div className="ml-80">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-medium">Total Sales</h3>
            <p className="text-3xl font-bold">
              ${products.reduce((sum, p) => sum + p.price, 0)}
            </p>
          </div>
          <div className="bg-gradient-to-r from-indigo-400 via-pink-500 to-red-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-medium">Total Products</h3>
            <p className="text-3xl font-bold">{products.length}</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-medium">Active Projects</h3>
            <p className="text-3xl font-bold">24</p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Product Prices
          </h3>
          {isLoading ? (
            <p>Loading chart...</p>
          ) : isError ? (
            <p className="text-red-500">{errorMsg}</p>
          ) : (
            <BarChart
              width={600}
              height={300}
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#4caf50" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </div>

        {/* You can replace the below user table with product data if needed */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            User Activity
          </h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-gray-600">Image</th>
                <th className="py-2 px-4 text-gray-600">Name</th>
                <th className="py-2 px-4 text-gray-600">price</th>
                <th className="py-2 px-4 text-gray-600">rating</th>
              </tr>
            </thead>
            {productArray.map((product) => (

            <tbody>
              <tr className="hover:bg-gray-100">
              <td className="px-4 py-4 whitespace-nowrap">
                        <img
                    src={`${product.image}`}
                    className="w-20 h-20 object-cover"
                  />                        </td>                <td className="py-2 px-4">{`${product.name}`}</td>
                <td className="py-2 px-4">{`${product.price}`}</td>
                <td className="py-2 px-4 text-green-600">{`${product.rating}`}</td>
              </tr>
             
            </tbody>))}
          </table>
        </div>
      </div>
    </main>
  );
}

export default Dash;
