import { useLocation } from "react-router-dom";
import React from "react";
import { Link, useParams ,useNavigate} from 'react-router-dom'

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const { orderId } = location.state || {};
  const { id } = useParams()

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white max-w-md w-full p-8 rounded-lg shadow-lg">
        {/* Icon or Animation */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Thank You for Your Order!
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Your order has been successfully placed.
        </p>

        {/* Order Details */}
        {/* <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Order Summary</h2>
          <p className="text-gray-600 mt-2">
            <span className="font-medium">Order ID:</span>{" "}
            <span className="text-purple-600">{orderId || "Not Available"}</span>
          </p>
        </div> */}

        {/* Instructions */}
        <p className="text-sm text-gray-500 mt-4 text-center">
          We will notify you via email once your order is shipped.
        </p>

        {/* Action Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => window.location.replace(`/Checkout/${id}`)}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
