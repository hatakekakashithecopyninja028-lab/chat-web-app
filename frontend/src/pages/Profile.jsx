import { useState } from "react";


import { Camera, CheckCheck, Mail, Settings, User } from "lucide-react";
import { useAuthStore } from "../store/authstore";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br  from-slate-900 via-purple-900/20 to-black backdrop-blur-sm">
      <div className="max-w-2xl rounded-4xl mx-auto bg-slate-900/60 p-8">
        <div className=" border-white/20 rounded-4xl p-8 space-y-8 shadow-2xl shadow-purple-500/10">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-2">Profile</h1>
            <p className="text-slate-400 text-lg">Your profile information</p>
          </div>



          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/mikasa.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-white/30 ring-4 ring-purple-500/20 shadow-2xl shadow-purple-500/25"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-110
                  p-3 rounded-full cursor-pointer shadow-lg shadow-purple-500/30
                  transition-all duration-300 ring-2 ring-white/20
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-white drop-shadow-lg" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-slate-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-6 py-4 backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl font-medium text-white shadow-lg shadow-purple-500/10 hover:bg-white/20 transition-all duration-300">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-slate-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-6 py-4 backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl font-medium text-white shadow-lg shadow-purple-500/10 hover:bg-white/20 transition-all duration-300 break-all">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-8 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl shadow-purple-500/5">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6" />
              Account Information
            </h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between py-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl px-6">
                <span className="text-slate-300 flex items-center gap-2">
                  <CheckCheck className="w-4 h-4 text-green-400" />
                  Member Since
                </span>
                <span className="text-white font-mono bg-black/20 px-3 py-1 rounded-full text-xs">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-4 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl px-6">
                <span className="text-slate-300">Account Status</span>
                <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-green-500/25 text-sm">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
