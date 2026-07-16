import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      login(data);

      if (data.user?.role === "admin") {
        navigate("/admin");
      } else if (data.user?.role === "delivery") {
        navigate("/delivery");
      } else {
        navigate("/");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-emerald-600">
          FreshMart
        </h1>

        <h2 className="text-2xl font-bold mt-6 text-center">
          Welcome Back 👋
        </h2>

        <p className="text-gray-500 text-center mt-2">
          Login to continue shopping
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 pr-12 focus:ring-2 focus:ring-emerald-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          <button
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-6">
          Don't have an account?
          <Link
            to="/register"
            className="text-emerald-600 ml-2 font-semibold"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;