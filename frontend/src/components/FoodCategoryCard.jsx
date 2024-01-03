import React from "react";
import regularDosa from "../assets/images/regular-dosa.png";

export default function FoodCategoryCard() {
  return (
    <div className="flex items-center w-full justify-center gap-36">
      <div className="flex border border-amber-400 py-1 px-10 items-center gap-3">
        <div className="">
          <img
            className="w-[150px] h-[150px]"
            src={regularDosa}
            alt="dosa category image"
          />
        </div>
        <div className="">
          <p className="text-xl font-semibold">Regular Dosa</p>
        </div>
      </div>
      <div className="flex border border-amber-400 px-10 py-1 items-center gap-3">
        <div className="">
          <img
            className="w-[150px] h-[150px]"
            src={regularDosa}
            alt="dosa category image"
          />
        </div>
        <div className="">
          <p className="text-xl font-semibold">Regular Dosa</p>
        </div>
      </div>
    </div>
  );
}
