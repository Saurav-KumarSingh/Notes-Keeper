import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditForm() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    name: state?.name || "",
    email: state?.email || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/user/api/profile`,
        {
          name: formData.name,
          email: formData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Profile updated successfully 🎉");

      setTimeout(() => navigate("/notes-keeper"), 1200);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Profile update failed!"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-[#797bf4] via-[#ffffff] to-[#eef2ff]
      px-4 sm:px-6 lg:px-8"
    >
      <div
        className="relative w-full max-w-md sm:max-w-lg
        rounded-3xl bg-white/80 backdrop-blur-xl
        shadow-[0_25px_70px_rgba(0,0,0,0.12)]
        border border-gray-100 p-6 sm:p-8 hover:shadow-2xl"
      >
        <div
          className="absolute top-0 left-6 right-6 sm:left-10 sm:right-10
          h-[3px] rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"
        />

        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
          Edit Profile
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Update your personal information
        </p>

        <div className="h-px bg-gray-200 my-5 sm:my-6" />

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-3 rounded-xl
              bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase">
              Email
            </label>
            <input
              type="email"
              name="email"
              disabled
              value={formData.email}
              className="mt-1 w-full px-4 py-3 rounded-xl
              bg-gray-100 border border-gray-200 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full mt-2 py-3 rounded-2xl
            font-semibold text-white
            bg-gradient-to-r from-indigo-500 to-blue-600
            shadow-lg hover:shadow-xl transition-all"
          >
            {loading ? "Updating..." : "Update Profile ✨"}
          </button>
        </form>
      </div>
    </div>
  );
}
