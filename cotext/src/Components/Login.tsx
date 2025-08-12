import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { loginUser } from "../Redux/Slice/User/Logingslice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RootState, AppDispatch } from "../Redux/Store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, isError, data, token } = useSelector(
    (state: RootState) => state.auth
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };


  useEffect(() => {
    console.log("Effect triggered, user:", data, "token:", token); // Debug log

    if (data && token) {
      // Save user and token to localStorage
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", token);
      toast.success("Logged in successfully!");

      // Safe check for role property (fallback to "user" if not available)
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    }

    if (isError) {
      toast.error("Login failed. Please try again.");
    }
  }, [data, token, isError, navigate]);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <ToastContainer />
      <div className="w-full flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800">Welcome back to Jammy</h1>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your Email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {isError && <p className="text-red-500 text-sm">{isError}</p>}
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>
          <div className="text-center text-sm">
            Don't have an account? <Link to="/signup" className="text-teal-600 hover:underline">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
