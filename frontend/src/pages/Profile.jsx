import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = async () => {
    try {
      await axios
        .post("http://localhost:3000/api/auth/logout", {
          withCredentials: true,
        })
        .then((data) => {
          dispatch(logout());
          console.log(data);
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
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
