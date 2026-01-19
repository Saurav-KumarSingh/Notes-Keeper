import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/api/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchProfile();
  }, []);

  const getInitials = (name) => {
    if (!name) return "N/A";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Account created successfully 🎉");
    navigate("/login");

  }

  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold text-purple-700">
          Notes Keeper
        </h1>

        <div className="flex items-center gap-4 relative">
          {/* Profile image / initials */}
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              onClick={() => setIsProfileOpen(true)}
              className="w-10 h-10 rounded-full border cursor-pointer"
            />
          ) : (
            <div
              onClick={() => setIsProfileOpen(true)}
              className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold cursor-pointer"
            >
              {getInitials(user?.name)}
            </div>
          )}

          {/* Profile Card */}
          {isProfileOpen && (
            <div className="absolute right-0 top-14 z-50">
              <div
                className="group  transition-[filter] relative w-62 h-87 bg-[#FAEDE4] font-['Robot_Flex'] border-b-2 border-b-[#F04E29]"
              >

                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="absolute top-2 right-2 text-lg font-bold z-50 cursor-pointer animate-bounce"
                >
                  ❌
                </button>

                <img
                  className="hover:saturate-100 saturate-60 group-hover:rounded-br-[100px] rounded-br-none transition-[border-radius]"
                  src={user?.profileImage}
                  alt="profile"
                />

                <p className="m-1.25 text-[#262626] text-base">
                  Name: <span>{user?.name}</span>
                </p>

                <p className="m-1.25 text-[#777674] text-xs">
                  Email: <span>{user?.email}</span>
                </p>

                <svg
                  className="group-hover:opacity-100 opacity-0 transition-opacity absolute right-[10px] bottom-[10px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="45"
                  height="64"
                  viewBox="0 0 45 64"
                  fill="none"
                >
                  <path
                    d="M5.67927 0.685928C5.66838 0.658706..."
                    fill="#F04E29"
                  />
                </svg>
                <div className="flex justify-between px-1">
                  <button onClick={handleLogout} className="z-10 cursor-pointer px-3 py-1 text-xs rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition">logout</button>
                  <Link
                    to="/notes-keeper/edit"
                    state={{
                      name: user?.name,
                      email: user?.email,
                    }}
                    className="z-10 cursor-pointer px-3 py-1 text-xs rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                  >
                    ✏️ edit
                  </Link>

                </div>
              </div>

            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
