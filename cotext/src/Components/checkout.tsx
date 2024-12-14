import React, { useState ,useEffect} from "react";
import { useLocation } from "react-router-dom";
import { Link, useParams ,useNavigate} from 'react-router-dom'

import axios from "axios";
const Checkout: React.FC = () => {
  const location = useLocation();
  const productData = location.state;
  interface Product {
    id: number;
    name: string;
    doc: string;
    price: number;  // Changed from 'Number' to 'number'
    image:string
  }
  
  interface ApiResponse {
    isSuccess: boolean;
    result: Product[];  // result is an array of Product
  }
const [products, setProducts] = useState<Product[]>([]); // Initialize as array or null
const [rating ,setrating]=useState<number>(5)
const [quantity, setQuantity] = useState<number>(0);

const { id } = useParams()
console.log(products);

// navigate('/Checkout/:id',{state:products})
useEffect(() => {
    // Retrieve qty from localStorage and parse it
    const savedQty = localStorage.getItem("productQty");
    if (savedQty) {
      setQuantity(parseInt(savedQty, 10)); // Convert to number
    }
  }, []); // Run only once when the component mounts



  useEffect(() => {
    console.log(id);
    
  axios
    .get<ApiResponse>(`http://localhost:3000/products/get/${id}`)
    .then((res) => {
      const rawData = res.data.result; // Assuming the result field contains the object
    setProducts(res.data.result)
    console.log(products);

    })
    .catch((err) => {
      console.error('Error fetching products:', err);
      setProducts([]); // Handle errors by clearing the products
    });

}, [id]);
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order Placed:", { productData, formData });
    alert("Order placed successfully!");
  };

  if (!products) {
    return <p className="text-center text-gray-600">No product selected!</p>;
  }

  




  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
        {/* Product Summary */}
        <div className="border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
          <div className="flex items-center gap-4 mt-4">
            <img
              src={products.image}
              alt={products.name}
              className="w-24 h-24 rounded-lg"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">{products.name}</h2>
              <p className="text-gray-500">Price: ${products.price}</p>
              <p className="text-gray-500"> Quty: {quantity}</p>
            </div>
          </div>
        </div>

        {/* Shipping Form */}
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="Zip Code"
              value={formData.zip}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Order Summary */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
            <div className="flex justify-between items-center mt-2">
              <span>Product Price:</span>
              <span>${products.price*quantity}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span>Shipping:</span>
              <span>$5.99</span>
            </div>
            <div className="flex justify-between items-center mt-4 font-bold text-gray-800">
              <span>Total:</span>
              <span>${products.price + 5.99}</span>
            </div>
          </div>

          {/* Submit Button */}
          <Link to={`/Confirm/${products.id}`}>
          <button 
            type="submit"
            className="w-full mt-6 py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 transition"
          >
            Confirm Order
          </button></Link>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
