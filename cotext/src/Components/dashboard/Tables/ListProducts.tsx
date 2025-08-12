import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, resetProducts } from "../../../Redux/Slice/Products/GetProductsSlice";
import { deleteProduct } from "../../../Redux/Slice/Products/DeleteProductSlice"; // Assuming you have a delete slice
import { RootState, AppDispatch } from "../../../Redux/Store";
import { Link } from "react-router-dom";
import { PlusCircleIcon, SearchIcon, EditIcon, TrashIcon } from "lucide-react";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import styles
import { useNavigate } from "react-router-dom";

// Define the type for a product
interface Product {
  id: number;
  name: string;
  Category: string;
  price: number;
  Quantity: number;
  status: string;
}

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null); // Track product ID to delete
  const [showDeleteModal, setShowDeleteModal] = useState(false); // For confirmation modal

  const dispatch = useDispatch<AppDispatch>();
const navigate = useNavigate();

  // Select data from Redux store and type it correctly
  const { isLoading, isError, errorMsg, data } = useSelector(
    (state: RootState) => state.getAllProducts
  );

  // Ensure that data is typed correctly as an array of Product
  const filteredData: Product[] = Array.isArray(data) ? data : Object.values(data || {});

  useEffect(() => {
    dispatch(getAllProducts());
    return () => {
      dispatch(resetProducts());
    };
  }, [dispatch]);

  const handleDelete = () => {
    if (deleteId !== null) {
      dispatch(deleteProduct(deleteId.toString())) // Convert ID to string if needed
        .then(() => {
          dispatch(getAllProducts()); // Refresh products list after deletion
          toast.success("✅ Product deleted successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((error) => {
          toast.error("❌ Failed to delete product!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.error("Delete Error:", error);
        });

      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const handleNavigateToUpdate = (id: number) => {
    navigate(`/admin/ProductForm/${id}`);
  };

  return (
    <div className="w-screen mt-9 ml-80">
      <main className="flex-grow p-6 rounded-lg">
        <ToastContainer /> {/* Toast notifications container */}
        <header className="bg-white shadow-md p-4 mb-6 rounded-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Products</h1>
            <Link to="/admin/ProductForm">
              <button
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
              >
                <PlusCircleIcon className="h-5 w-5" />
                <span>Add New Product</span>
              </button>
            </Link>
          </div>
        </header>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <div className="flex mb-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="overflow-x-auto">
              {isLoading ? (
                <p>Loading...</p>
              ) : isError ? (
                <p className="text-red-500">Error: {errorMsg}</p>
              ) : filteredData.length === 0 ? (
                <p>No products found.</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      <th className="px-4 py-3">Image</th>
                      <th className="px-4 py-3">Product Name</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Quantity</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((product: Product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-gray-50 transition duration-150 ease-in-out"
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                        <img
                    src={`${product.image}`}
                    className="w-20 h-20 object-cover"
                  />                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{product.Category}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">${product.price}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{product.Quantity}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{product.status}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              className="text-blue-500 hover:text-blue-700"
                              onClick={() => handleNavigateToUpdate(product.id)}
                            >
                              <EditIcon className="w-5 h-5" />
                            </button>
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={() => {
                                setDeleteId(product.id); // Set product ID to delete
                                setShowDeleteModal(true); // Show the confirmation modal
                              }}
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-12 rounded-lg shadow-lg">
              <p className="text-xl">Are you sure you want to delete this product?</p>
              <div className="flex space-x-4 mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={handleDelete}
                >
                  Yes, Delete
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
