import React from "react";
import { Link } from "react-router-dom";
import gundan from "../assets/images/gundan-footer.png";
import logo from "../assets/images/logo-footer.png";

export default function Footer() {
  return (
    <footer>
      <div className=" xl:gap-20 w-full mx-auto text-white border-[5px] p-2 border-amber-400 flex items-center">
        <div className=" flex items-center w-1/2 ">
          <img
            className="w-[140px] h-[125px] xl:h-[23rem] xl:w-[26rem]"
            src={gundan}
            alt="footer image"
          />
          <img
            className="absolute ml-24 xl:ml-64 h-[90px] w-[105px] xl:h-[17rem] xl:w-[20rem]"
            src={logo}
            alt="footer logo"
          />
        </div>
        <div className="flex w-1/2 items-center">
          <div className="flex  mx-auto">
            <div className="flex items-center">
              <div className="flex flex-col gap-2 xl:gap-3">
                <div className="">
                  <p className=" font-bold">Contact Us</p>
                </div>
                <div className="text-xs xl:text-base">
                  <p className="w-[150px]  xl:w-[16rem]">
                    8350 N MacArthur Blvd # 120, Irving, TX 75063, United States
                  </p>
                  <p>+1 469-299-8474</p>
                </div>
                <div>
                  <p className="text-sm xl:text-base">dallasdosa@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="flex max-sm:hidden flex-col gap-1 md:gap-3">
              <p className="font-bold">Dallas Dosa</p>
              <Link to={"/about-us"}>
                <p>About</p>
              </Link>
              <Link to={"/menu"}>
                <p>Menu</p>
              </Link>
              <Link to={"/contact-us"}>
                <p>Contact</p>
              </Link>
              <Link to={"/category"}>
                <p>Order</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
