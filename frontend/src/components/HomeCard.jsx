import React from "react";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import dosa from "../assets/images/card-sample.png";

export default function HomeCard() {
  return (
    <div className="">
      <div className="flex w-64 flex-col p-3 text-white">
        <div>
          <img className="h-44 w-60" src={dosa} alt="food item cover image" />
        </div>
        <div className="pt-4  flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="font-bold">kajosd</p>
            <div className="flex items-center ">
              <MdOutlineAttachMoney className=" h-7 w-7 fill-white" />
              <p className="font-semibold">7.99</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <p className="mr-2">4</p>
            <IoStarSharp className="fill-orange-600 mr-16" />
            <button className="flex border border-white rounded-md items-center p-1 font-semibold text-sm">
              ADD
              <MdAdd className="fill-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
