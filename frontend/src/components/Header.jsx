import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/images/logo-header.png";
import { PiShoppingCartSimpleThin, PiUserCircleThin } from "react-icons/pi";

export default function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.cart);
  return (
    <header className="sticky z-[1001] top-0 bg-black">
      <div className=" text-white w-full justify-between  border-2 py-1 flex items-center border-amber-400">
        <div className="flex items-center w-[57%] xl:w-[53.5%] justify-between">
          <div className="flex gap-3 xl:gap-10 ml-3 xl:ml-10 ">
            <Link to={"/about-us"}>
              <p className="text-sm xl:text-base">About</p>
            </Link>
            <Link to={"/category"}>
              <p className="text-sm xl:text-base">Menu</p>
            </Link>
            <Link to={"/contact-us"}>
              <p className="text-sm xl:text-base">Contact</p>
            </Link>
          </div>
          <div>
            <Link to={"/"}>
              <img className="w-14 xl:w-20" src={logo} alt="header logo" />
            </Link>
          </div>
        </div>
        <div className="flex mr-5 xl:mr-10 gap-5 items-center xl:gap-10">
          <Link to={"/cart"}>
            <div className="absolute h-[16px] w-[16px] xl:w-[18px] xl:h-[18px] bg-amber-400 font-semibold text-xs xl:text-sm xl:mt-1 ml-4 xl:ml-5 flex items-center justify-center rounded-[50%]">
              {cartItems.length}
            </div>
            <PiShoppingCartSimpleThin className="fill-white h-8 w-8 xl:h-10 xl:w-10" />
          </Link>
          <Link to={"/dashboard"}>
            <PiUserCircleThin className="fill-white h-9 w-9 xl:h-10 xl:w-10" />
          </Link>
        </div>
      </div>
    </header>
  );
}
