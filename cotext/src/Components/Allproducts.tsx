import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, resetProducts } from "../Redux/Slice/Products/GetProductsSlice";
import { addToCartAPI ,fetchCart} from "../Redux/Slice/cartt/creatCartslice";
import { RootState, AppDispatch } from "../Redux/Store";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  doc?: string;
  rating?: number;
}

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const { isLoading, isError, errorMsg, data } = useSelector(
    (state: RootState) => state.getAllProducts
  );
  const { cartItems } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(getAllProducts());

    return () => {
      dispatch(resetProducts());
      dispatch(fetchCart()); // 👈 This triggers the fetchCart API call

    };
  }, [dispatch]);

  const productArray: Product[] = Array.isArray(data) ? data : Object.values(data || {});

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${index < Math.floor(rating) ? "text-orange-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
  };

  const handleAddToCart = (product: Product) => {
    const payload = {
      id: product.id,
      productId: product.id.toString(), // convert to string if needed
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1 

    };
    
    dispatch(addToCartAPI(payload));
  };

  if (isLoading) return <p className="text-center text-lg py-10">Loading...</p>;
  if (isError) return <p className="text-center text-red-600">Error: {errorMsg}</p>;

  return (
    <div id="Products" className="container mx-auto p-4 px-20 ">
      <h1 className="text-center py-10 font-bold text-5xl text-blue-950">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productArray.map((product) => (
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
                loading="lazy"
              />
              <div className="absolute top-2 right-2 space-y-2">
                <button
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  aria-label="Add to Wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${hoveredProduct === product.id ? "text-red-500" : "text-gray-400"}`}
                  />
                </button>
                <button
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  aria-label="View Details"
                >
                  <Eye
                    className={`w-5 h-5 ${hoveredProduct === product.id ? "text-blue-500" : "text-gray-400"}`}
                  />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {product.doc && <span className=" text-sm font-medium">{product.doc}</span>}
              <div className="flex items-center space-x-1">
                {renderStars(product.rating || 5)}
                <span className="text-gray-500 text-sm ml-1">({product.rating || 5})</span>
              </div>
              <Link
                to={`/product/${product.id}`}
                className="font-medium text-gray-800 hover:text-green-500 transition-colors"
              >
                {product.name}
              </Link>
              <div className="flex items-center justify-between">
                <span className="text-green-500 text-lg font-semibold">${product.price}</span>
                <div
                  className={`p-2 rounded-full transition-colors ${
                    hoveredProduct === product.id ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <button onClick={() => handleAddToCart(product)} aria-label="Add to Cart">
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
