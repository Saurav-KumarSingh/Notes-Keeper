import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // console.log(import.meta.env.VITE_API_URL)

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        formData,
      );

      toast.success("Account created successfully 🎉");

      setFormData({ name: "", email: "", password: "" });

      // optional redirect
      setTimeout(() => navigate("/login"), 1200);

    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Network or server error. Please try again.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-[#f5f7fa] via-[#ffffff] to-[#eef2ff]
      px-4 sm:px-6 lg:px-8">

      <div className="relative w-full max-w-md sm:max-w-lg
        rounded-3xl bg-white/80 backdrop-blur-xl
        shadow-[0_25px_70px_rgba(0,0,0,0.12)]
        border border-gray-100 p-6 sm:p-8">

        <div className="absolute top-0 left-6 right-6 sm:left-10 sm:right-10
          h-[3px] rounded-full bg-gradient-to-r from-indigo-500 to-blue-500" />

        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
          NotesKeeper
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base leading-relaxed">
          A calm, focused space for your thoughts and ideas.
        </p>

        <div className="h-px bg-gray-200 my-5 sm:my-6" />

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="notekeeper@gmail.com"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-2xl
            font-semibold text-white
            bg-gradient-to-r from-indigo-500 to-blue-600 cursor-pointer"
          >
            Create Your Workspace ✨
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?
          <Link to="/login" className="text-indigo-600 font-semibold ml-1">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
