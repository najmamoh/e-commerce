import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

const ProductCard: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("purple");
  const { id } = useParams();
  const navigate = useNavigate();

  interface Product {
    id: number;
    name: string;
    doc: string;
    price: number;  // Changed from 'Number' to 'number'
    image: string;
  }

  interface ApiResponse {
    isSuccess: boolean;
    result: Product[];  // result is an array of Product
  }

  const [products, setProducts] = useState<Product | null>(null); // Initialize with null to handle loading state
  const [rating, setRating] = useState<number>(5);

  useEffect(() => {
  axios
    .get<ApiResponse>(`http://localhost:3000/products/get/${id}`)
    .then((res) => {
      const rawData = res.data.result; // Assuming the result field contains the object
    setProducts(res.data.product)
    

    })
    .catch((err) => {
      console.error('Error fetching products:', err);
      setProducts([]); // Handle errors by clearing the products
    });

}, [id]);

  useEffect(() => {
    if (products) {
      localStorage.setItem("productQty", quantity.toString());
    }
  }, [quantity]);

  const handleQuantityChange = (type: "increment" | "decrement") => {
    setQuantity((prev) =>
      type === "increment" ? prev + 1 : prev > 1 ? prev - 1 : 1
    );
  };

  const handleAddToCart = () => {
    if (products) {
      // Retrieve the existing cart from localStorage (if it exists), or set an empty array if it doesn't
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  
      // Check if the product already exists in the cart
      const productIndex = storedCart.findIndex((item: { id: number }) => item.id === products.id);
  
      if (productIndex !== -1) {
        // If the product already exists in the cart, update its quantity
        storedCart[productIndex].quantity += quantity;
      } else {
        // If the product doesn't exist, add the new product to the cart
        storedCart.push({ ...products, quantity });
      }
  
      // Set the updated cart back to localStorage without overwriting other cart items
      localStorage.setItem("cart", JSON.stringify(storedCart));
  
      console.log("Updated Cart:", storedCart);
    }
  };
  

  return (
    <div className="bg-purple-50 min-h-screen flex justify-center items-center">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-12">
        {/* Image Section */}
        <div>
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <img
              src={products?.image}
              alt="Main Product"
              className="w-full rounded-lg"
            />
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {/* Thumbnails */}
            {[...Array(4)].map((_, index) => (
              <img
                key={index}
                src="https://via.placeholder.com/100"
                alt={`Thumbnail ${index + 1}`}
                className="w-20 h-20 rounded-lg cursor-pointer border-2 border-transparent hover:border-purple-400"
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div>
          {/* Title and Reviews */}
          <h1 className="text-3xl font-bold text-gray-800">{products?.name}</h1>
          <p className="text-gray-600 flex items-center gap-2 mt-2">
            <span className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </span>
            (2298 reviews)
          </p>

          {/* Description */}
          <p className="mt-4 text-gray-600">
            Our 'Micro-Abrasive' brush is tough on knots but gentle on your cat.
          </p>

          {/* Pricing */}
          <div className="mt-4 flex items-center gap-4">
            <span className="text-2xl font-bold text-pink-600">${products?.price}</span>
            <span className="text-gray-400 line-through">$50.99</span>
            <span className="text-green-600 font-bold">38% OFF</span>
          </div>

          {/* Quantity Selector */}
          <div className="mt-6">
            <p className="text-gray-700 font-semibold">Quantity</p>
            <div className="flex items-center mt-2 gap-4">
              <button
                onClick={() => handleQuantityChange("decrement")}
                className="w-8 h-8 flex justify-center items-center bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-gray-700">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("increment")}
                className="w-8 h-8 flex justify-center items-center bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-8">
            <Link to={`/checkout/${products?.id}`}>
            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-gray-800 text-white font-bold rounded-full shadow-lg hover:bg-gray-600 transition"
            >
              ADD TO CART
            </button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
