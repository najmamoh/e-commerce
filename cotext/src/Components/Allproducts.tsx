import React, { useState, useEffect } from 'react';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from "axios";

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

const ProductGrid: React.FC = () => {
const [products, setProducts] = useState<Product[]>([]); // Initialize as array or null
const [rating ,setrating]=useState<number>(5)

  useEffect(() => {
  axios
    .get<ApiResponse>('http://localhost:3000/products/get')
    .then((res) => {
      const rawData = res.data.result; // Assuming the result field contains the object
      console.log('Raw API Response:', rawData);
      
      if (rawData && typeof rawData === 'object') {
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

  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(3); // Initially show 3 products

  const showMoreProducts = () => {
    setVisibleCount((prevCount) => prevCount + 3); // Show 3 more products each time
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${
            index < Math.floor(rating)
              ? 'text-orange-400'
              : index < rating
              ? 'text-orange-400'
              : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
  };

  return (
    <div id='Products' className="container mx-auto p-4 px-20">
      <h1 className="text-center py-10 font-bold text-5xl">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-contain mb-4"
              />
              <div className="absolute top-2 right-2 space-y-2">
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  <Heart
                    className={`w-5 h-5 ${
                      hoveredProduct === product.id
                        ? 'text-red-500'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  <Eye
                    className={`w-5 h-5 ${
                      hoveredProduct === product.id
                        ? 'text-blue-500'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-green-500 text-sm font-medium">{product.doc}</span>

              <div className="flex items-center space-x-1">
                {renderStars(rating)} 
              <span className="text-gray-500 text-sm ml-1">({rating})</span>
              </div>

              <h3 className="font-medium text-gray-800 hover:text-green-500 transition-colors">
                {product.name}
              </h3>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-green-500 text-lg font-semibold">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    {/* ${product.originalPrice.toFixed(2)} */}
                  </span>
                </div>

                <Link
                  to={`/product/${product.id}`}
                  className={`p-2 rounded-full transition-colors ${
                    hoveredProduct === product.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < (products?.length || 0) && (
        <div className="text-center mt-6">
          <button
            onClick={showMoreProducts}
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition-colors"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
