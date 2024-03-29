import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../redux/slices/authSlice";
import { FaHistory } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { BiSolidEdit } from "react-icons/bi";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { MdOutlineFoodBank } from "react-icons/md";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const role = user.roles.find((i) => i === 5150);
    if (role) {
      setIsAdmin(true);
    }
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(logout());
    toast.success("Logged Out Successfully!");
    navigate("/sign-in");
    try {
      const response = await axios.post(
        "https://testing.dallasdosa.com/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col my-20 gap-6 text-white">
      <div className="flex justify-center items-center w-full">
        <p className="uppercase font-bold text-3xl">Dashboard</p>
      </div>
      <div className="flex my-10 flex-col justify-center items-center gap-10">
        <div className="flex max-md:flex-col  gap-10">
          {isAdmin ? (
            <Link to={"/current-orders"}>
              <div className="flex gap-5 flex-col justify-center items-center">
                <MdOutlineFoodBank className="fill-amber-400 h-[180px] w-[200px]" />
                <p className="font-bold ">Current Orders</p>
              </div>
            </Link>
          ) : (
            <Link to={"/profile"}>
              <div className="flex gap-5 flex-col justify-center items-center">
                <ImProfile className="fill-amber-400 h-[180px] w-[200px]" />
                <p className="font-bold ">Profile</p>
              </div>
            </Link>
          )}{" "}
          <Link to={"/order-history"}>
            <div className="flex gap-5  flex-col justify-center items-center">
              <FaHistory className="fill-amber-400 h-[180px] w-[200px]" />
              <p className="font-bold ">Order History</p>
            </div>
          </Link>
        </div>
        {isAdmin && (
          <div className="flex max-md:flex-col gap-10">
            <Link to={"/create-item"}>
              <div className="flex gap-5 flex-col justify-center items-center">
                <MdOutlineCreateNewFolder className="fill-amber-400 h-[200px] w-[200px]" />
                <p className="font-bold ">Create Item</p>
              </div>
            </Link>
            <Link to={"/order-history"}>
              <div className="flex gap-5  flex-col justify-center items-center">
                <BiSolidEdit className="fill-amber-400 h-[200px] w-[200px]" />
                <p className="font-bold ">Edit Item</p>
              </div>
            </Link>
          </div>
        )}
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
