import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/Store"; // adjust the path as needed
import { createOrder, resetOrderState } from "../Redux/Slice/Order/CreatOrderSlice"; // adjust the path

const Checkout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isSuccess, isError, errorMsg } = useSelector((state: RootState) => state.postOrders);

  const location = useLocation();
  const productData = location.state;
  const { id } = useParams();

  interface Product {
    id: number;
    name: string;
    location: number;
    email: number;
    city: string;
    phone:number
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const savedQty = localStorage.getItem("productQty");
    if (savedQty) {
      setQuantity(parseInt(savedQty, 10));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No auth token found. Redirect to login or handle accordingly.");
      return;
    }

    axios
      .get("http://localhost:3000/cart/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const rawData = res.data.items;

        const mappedData = rawData.map((item: any) => ({
          id: item.productId,
          name: item.product?.name,
          price: item.product?.price,
          quantity: item.quantity,
          image: item.product?.image,
        }));

        setProducts(mappedData);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([]);
      });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.address, 
      city: formData.city,
      total: totalPrice,
      items: products.map((p) => ({
        productId: p.id,
        quantity: p.quantity,
      })),
    };
    
    dispatch(createOrder(orderData));
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Order placed successfully!");
      dispatch(resetOrderState());
    }

    if (isError) {
      alert(`Order failed: ${errorMsg}`);
    }
  }, [isSuccess, isError, dispatch, errorMsg]);

  if (products.length === 0) {
    return <p className="text-center text-gray-600">No products in your cart!</p>;
  }

  const totalProductPrice = products.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = 2.99;
  const totalPrice = totalProductPrice + shippingCost;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center mt-20">
      <div className="max-w-7xl w-full bg-white rounded-lg shadow-lg p-6">
        <div className="border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>

          {products.map((item) => (
            <div key={item.id} className="flex items-center gap-4 mt-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg" />
              <div>
                <h2 className="text-lg font-semibold text-gray-700">{item.name}</h2>
                <p className="text-gray-500">Price: ${item.price}</p>
                <p className="text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

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
              name="phone"
              placeholder="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
            <div className="flex justify-between items-center mt-2">
              <span>Product Total:</span>
              <span>${totalProductPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span>Shipping:</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mt-4 font-bold text-gray-800">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
<Link to="/Order">
          <button
            type="submit"
            className="w-full mt-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-600 transition"
            disabled={isLoading}
          >
            {isLoading ? "Placing Order..." : "Confirm Order"}
          </button></Link>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
