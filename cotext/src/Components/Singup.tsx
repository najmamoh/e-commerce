import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUser, resetPostUser } from "@/Redux/Slice/User/CreatrsliceUser";
import { RootState, AppDispatch } from "@/Redux/Store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError, isSuccess, errorMsg } = useSelector(
    (state: RootState) => state.createuser
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      toast.warn("Please fill in all fields");
      return;
    }

    dispatch(createUser({ name, email, password }));
  };

  // Handle success and error notifications
  useEffect(() => {
    if (isSuccess) {
      toast.success("Account created successfully! 🎉");
      setFormData({ name: "", email: "", password: "" });
      dispatch(resetPostUser());
    }

    if (isError) {
      toast.error(errorMsg || "Something went wrong. Please try again.");
    }
  }, [isSuccess, isError, errorMsg, dispatch]);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <ToastContainer />
      <div className="w-full flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800">
              Welcome to Jammy
            </h1>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-700">
                Full Name
              </label>
              <Input
                id="name"
                placeholder="John Doe"
                className="w-full"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your Email here"
                className="w-full"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="text-center text-sm">
            Already have an account? {" "}
            <Link to="/login" className="text-teal-600 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
