import React, { useEffect, useState, useRef } from "react";
import { Menu, Phone, ChevronDown, X, ShoppingCart, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, removeFromCartAPI } from "@/Redux/Slice/cartt/creatCartslice";
import { Button } from "@/components/ui/button";
import { AppDispatch } from '../Redux/Store';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const Header: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cartModalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const nav = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Blog", path: "/blog" },
  ];

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [username, setUsername] = useState("Guest");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const { cartItems = [], isLoading, isError } = useSelector((state: any) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const name = parsedUser.name || "Guest";
        setUsername(name.slice(0, 2).toUpperCase());
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUsername("GU");
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartModalRef.current && !cartModalRef.current.contains(event.target as Node)) {
        setCartModalOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    setDropdownOpen(false);
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleCartModal = () => {
    setCartModalOpen(!cartModalOpen);
    if (!cartModalOpen) {
      dispatch(fetchCart());
    }
  };

  const handleDelete = () => {
    if (deleteId !== null) {
      dispatch(removeFromCartAPI(deleteId))
        .then(() => dispatch(fetchCart()))
        .catch((error) => console.error("Delete Error:", error));

      setDeleteId(null);
    }
  };

  const calculateTotal = () =>
    cartItems?.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-800 text-white py-4 px-4 md:px-6 lg:px-8 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <button className="lg:hidden mr-4 focus:outline-none" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <Link to="/" className="text-xl font-bold">ARAWEELO_CAKES</Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-8">
          {nav.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-white hover:text-green-400 transition-colors text-sm font-medium"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center">
            <Phone className="h-5 w-5 mr-2 text-green-400" />
            <span className="text-sm font-medium">+123 (456) 7890</span>
          </div>

          {/* Cart */}
          <div className="relative">
            <button className="relative focus:outline-none" onClick={toggleCartModal}>
              <ShoppingCart className="h-6 w-6 text-white hover:text-green-400 transition-colors" />
              {cartItems?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>

          {/* Avatar & Dropdown */}
          <div className="relative  ">
            <button
              onClick={toggleDropdown}
              className="w-10 h-10 rounded-full ml-20 bg-gray-700 text-white font-bold flex items-center justify-center uppercase hover:bg-green-600"
            >
              {username}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg z-30">
                <Link
                  to="/admin"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => setDropdownOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      {cartModalOpen && (
        <div
          ref={cartModalRef}
          className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-20 text-gray-800 max-h-[80vh] overflow-auto"
        >
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-lg">Your Cart</h3>
          </div>

          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : isError ? (
            <div className="p-4 text-center text-red-500">Failed to load cart</div>
          ) : cartItems?.length === 0 ? (
            <div className="p-4 text-center text-gray-500">Your cart is empty</div>
          ) : (
            <>
              <div className="divide-y divide-gray-100">
                {cartItems.map((item: CartItem) => (
                  <div key={item.id} className="p-4 flex items-start gap-3">
                    <div className="h-16 w-16 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover rounded-md"
                        />
                      ) : (
                        <ShoppingCart className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{item.name}</h4>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-sm font-semibold">${item.price.toFixed(2)}</span>
                        <div className="flex items-center border rounded">
                          <button className="px-2 py-1 text-sm font-semibold">-</button>
                          <span className="px-4">{item.quantity}</span>
                          <button className="px-2 py-1 text-sm font-semibold">+</button>
                        </div>
                      </div>
                    </div>
                    <button className="ml-3 text-gray-600 hover:text-red-600">
                      <Trash2 onClick={handleDelete} className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-4 flex justify-between">
                <Link
                  to="/Cart"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
                >
                  Go to Cart
                </Link>
                <p className="text-sm text-gray-500">
                  Total: ${calculateTotal()}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
