import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-[#f5f7fa] via-[#ffffff] to-[#eef2ff]
      px-4 sm:px-6 lg:px-8">

      {/* Card */}
      <div className="relative w-full max-w-md sm:max-w-lg
        rounded-3xl bg-white/80 backdrop-blur-xl
        shadow-[0_25px_70px_rgba(0,0,0,0.12)]
        border border-gray-100 p-6 sm:p-8">

        {/* Accent Line */}
        <div className="absolute top-0 left-6 right-6 sm:left-10 sm:right-10
          h-[3px] rounded-full bg-gradient-to-r from-indigo-500 to-blue-500" />

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
          NotesKeeper
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base leading-relaxed">
          A calm, focused space for your thoughts and ideas.
        </p>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-5 sm:my-6" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">


          {/* Email */}
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
              className="mt-1 w-full px-4 py-3 rounded-xl
              bg-gray-50 border border-gray-200
              text-gray-900 placeholder-gray-400
              focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300
              outline-none transition-all"
            />
          </div>

          {/* Password */}
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
              className="mt-1 w-full px-4 py-3 rounded-xl
              bg-gray-50 border border-gray-200
              text-gray-900 placeholder-gray-400
              focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300
              outline-none transition-all"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3 sm:py-3.5 rounded-2xl
            font-semibold text-white
            bg-gradient-to-r from-indigo-500 to-blue-600
            hover:from-indigo-600 hover:to-blue-700
            active:scale-[0.97]
            transition-all shadow-lg hover:shadow-xl"
          >
            Login to Your Workspace ✨
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm sm:text-base text-gray-500 text-center mt-6 sm:mt-8">
          Don't have an account?
          <Link
            to="/"
            className="text-indigo-600 font-semibold ml-1 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
