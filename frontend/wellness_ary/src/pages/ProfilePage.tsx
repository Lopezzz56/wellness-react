// pages/Profile.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from '../config/api'; 

const Profile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth");
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmail(res.data.email);
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
return (
  <div className="flex justify-center items-center min-h-[60vh] px-4">
    <div className="w-full max-w-md bg-transparent rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 p-6">
      <h2 className="text-2xl text-white font-bold mb-4 text-center">Profile</h2>
      <p className="text-lg text-white mb-6 text-center">
        <strong>Email:</strong> {email}
      </p>
      <div className="flex justify-center">
        <button
          onClick={handleLogout}
          className="border border-gray-300 bg-transparent rounded-xl shadow-sm hover:font-bold focus:outline-none focus:ring-2 text-white px-4 py-2 hover:bg-white/10"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
);

};

export default Profile;
