import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/logout");
      const data = await res.json();
      dispatch(logout());
      console.log(data);
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
      <div className="flex">
        <div className="flex flex-col gap-5 ">
          <div className="flex gap-5 items-center justify-between">
            <p>Username:</p>
            <input
              disabled
              className="w-fit appearance-none bg-transparent border border-amber-400  focus:outline-none p-1 rounded-md"
              value={user.username}
              type="text"
            />
          </div>
          <div className="flex gap-5 items-center justify-between">
            <p className="">Email Address:</p>
            <input
              disabled
              className="w-fit appearance-none bg-transparent border border-amber-400  focus:outline-none p-1 rounded-md"
              value={user.email}
              type="text"
            />
          </div>
        </div>
        <div className=""></div>
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
