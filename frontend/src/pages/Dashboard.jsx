import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSendLogoutMutation } from "../redux/apiSlices/authApiSlice"
import { FaHistory } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { BiSolidEdit } from "react-icons/bi";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { MdOutlineFoodBank } from "react-icons/md";

export default function Dashboard() {
  const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  if (isLoading) return <p>Logging Out...</p>

  if (isError) return <p>Error: {error.data?.message}</p>

  return (
    <div className="flex flex-col my-20 gap-6 text-white">
      <div className="flex justify-center items-center w-full">
        <p className="uppercase font-bold text-3xl">Dashboard</p>
      </div>
      {/* <div className="flex my-10 flex-col justify-center items-center gap-10"> */}
      {/*   <div className="flex  gap-10"> */}
      {/*     {user.isAdmin ? ( */}
      {/*       <Link to={"/current-orders"}> */}
      {/*         <div className="flex gap-5 flex-col justify-center items-center"> */}
      {/*           <MdOutlineFoodBank className="fill-amber-400 h-[180px] w-[200px]" /> */}
      {/*           <p className="font-bold ">Current Orders</p> */}
      {/*         </div> */}
      {/*       </Link> */}
      {/*     ) : ( */}
      {/*       <Link to={"/profile"}> */}
      {/*         <div className="flex gap-5 flex-col justify-center items-center"> */}
      {/*           <ImProfile className="fill-amber-400 h-[180px] w-[200px]" /> */}
      {/*           <p className="font-bold ">Profile</p> */}
      {/*         </div> */}
      {/*       </Link> */}
      {/*     )}{" "} */}
      {/*     <Link to={"/order-history"}> */}
      {/*       <div className="flex gap-5  flex-col justify-center items-center"> */}
      {/*         <FaHistory className="fill-amber-400 h-[180px] w-[200px]" /> */}
      {/*         <p className="font-bold ">Order History</p> */}
      {/*       </div> */}
      {/*     </Link> */}
      {/*   </div> */}
      {/*   {user.isAdmin && ( */}
      {/*     <div className="flex  gap-10"> */}
      {/*       <Link to={"/create-item"}> */}
      {/*         <div className="flex gap-5 flex-col justify-center items-center"> */}
      {/*           <MdOutlineCreateNewFolder className="fill-amber-400 h-[200px] w-[200px]" /> */}
      {/*           <p className="font-bold ">Create Item</p> */}
      {/*         </div> */}
      {/*       </Link> */}
      {/*       <Link to={"/order-history"}> */}
      {/*         <div className="flex gap-5  flex-col justify-center items-center"> */}
      {/*           <BiSolidEdit className="fill-amber-400 h-[200px] w-[200px]" /> */}
      {/*           <p className="font-bold ">Edit Item</p> */}
      {/*         </div> */}
      {/*       </Link> */}
      {/*     </div> */}
      {/*   )} */}
      {/* </div> */}
      <div className="flex justify-center items-center w-full">
        <button
          onClick={sendLogout}
          className="text-sm bg-amber-400 hover:opacity-95 py-2 px-4 rounded-2xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
