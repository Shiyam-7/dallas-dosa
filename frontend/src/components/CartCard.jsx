import React from "react";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import tawaidly from "../assets/images/tawa-idly.png";

export default function CartCard() {
  return (
    <div className="flex gap-5 m-4 border border-amber-400 p-5">
      <div>
        <img
          className="w-[14rem] h-[9rem]"
          src={tawaidly}
          alt="tawa idly image"
        />
      </div>
      <div className="flex gap-5 items-start justify-center flex-col">
        <p>Tawa Idly</p>
        <div className="flex items-center ">
          <MdOutlineAttachMoney className=" h-5 w-5 fill-white" />
          <p>7.99</p>
        </div>
        <div className="flex items-center gap-2">
          <MdDelete className="h-6 w-6 fill-white" />
          <p>1</p>
          <FaPlusCircle className="h-5 w-5 fill-white" />
        </div>
      </div>
    </div>
  );
}
