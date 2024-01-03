import React from "react";
import regularDosa from "../assets/images/regular-dosa.png";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const navigate = useNavigate();
  const foodCategory = [
    { id: 1, name: "Regular Dosa" },
    { id: 2, name: "Kids Dosa" },
    { id: 3, name: "House Dosa" },
    { id: 4, name: "Healthy Dosa" },
    { id: 5, name: "Veggies Dosa" },
    { id: 6, name: "Schezwan Dosa" },
    { id: 7, name: "Idly" },
    { id: 8, name: "Upma" },
    { id: 9, name: "Snacks" },
  ];

  return (
    <div className="flex flex-col text-white">
      <div className="flex gap-2 flex-col w-full items-center justify-center text-center">
        <div className="my-10">
          <p className="text-4xl font-bold">Our Menu</p>
        </div>
        <div className="text-2xl font-bold">
          <p>Pick and Try out</p>
        </div>
        <div className="w-[770px]">
          <p>
            Food, in the end, in our tradition, is something holy. It's not
            about nutrients and calories. It's about sharing. It's about
            honesty. It's about identity
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {foodCategory.length !== 0 &&
          foodCategory.map((category) => (
            <div
              onClick={() =>
                navigate(
                  `/category/${category.name.toLowerCase().replace(/\W/g, "")}`
                )
              }
              key={category.id}
              className="flex gap-10 w-1/2 justify-center mx-auto my-20 flex-wrap"
            >
              <div className="flex cursor-pointer border border-amber-400 py-1 px-10 items-center gap-3">
                <div className="">
                  <img
                    className="w-[150px] h-[150px]"
                    src={regularDosa}
                    alt="dosa category image"
                  />
                </div>
                <div className="">
                  <p className="text-xl font-semibold">{category.name}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
