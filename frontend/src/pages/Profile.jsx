import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://dallas-dosa.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col my-20 gap-6 text-white">
      <div className="flex justify-center items-center w-full">
        <p className="uppercase font-bold text-3xl">Profile</p>
      </div>
      <div className="flex justify-center items-center w-full">
        <p className="uppercase font-semibold text-xl">Hey {user.username}!</p>
      </div>
      <div className="flex gap-5 items-center justify-center">
        <div className="flex gap-4 flex-col">
          <p>Username:</p>
          <p>Email:</p>
          <p>Address:</p>
        </div>
        <div className="flex gap-4 flex-col">
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>{user.address}</p>
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <button
          onClick={handleLogout}
          className="text-sm bg-amber-400 hover:opacity-95 py-2 px-4 rounded-2xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
