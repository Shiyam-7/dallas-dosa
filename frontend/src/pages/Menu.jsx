import React from "react";
import Card from "../components/Card";
import regularDosa from "../assets/images/regular-dosa.png";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5";
import { MdAdd } from "react-icons/md";

export default function Menu() {
  const navigate = useNavigate();
  const [filteredFoods, setFilteredFoods] = useState([]);
  const location = useLocation();
  const foodEndpoint = location.pathname.split("/")[2];
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchFoodType = async () => {
      const res = await fetch(
        `http://localhost:3000/product?category=${foodEndpoint}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setFilteredFoods(data);
    };
    fetchFoodType();
  }, [foodEndpoint]);
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
      {filteredFoods.length !== 0 && (
        <div className="flex mt-16 gap-[500px] items-center w-full justify-center ">
          <div className="flex">
            <div className="flex border border-amber-400 py-1 px-10 items-center gap-3">
              <div className="">
                <img
                  className="w-[125px] h-[125px]"
                  src={regularDosa}
                  alt="dosa category image"
                />
              </div>
              <div className="">
                <p className="text-xl font-semibold">
                  {foodEndpoint.charAt(0).toUpperCase() + foodEndpoint.slice(1)}
                </p>
              </div>
            </div>
          </div>
          <div className="border flex justify-between items-center h-fit p-2 border-amber-400">
            <p>Go to main menu</p>
          </div>
        </div>
      )}
      {filteredFoods.length !== 0 ? (
        filteredFoods.map((item) => (
          <div
            onClick={() => {
              navigate(`/food/${item._id}`);
            }}
            className="flex cursor-pointer w-full justify-center gap-10 my-20 flex-wrap"
          >
            <div className="flex flex-col p-3 text-white">
              <div className="flex">
                <img
                  className="h-[250px] w-[300px] object-cover"
                  src={`http://localhost:3000/images/${item.img}`}
                  alt="food item cover image"
                />
              </div>
              <div className="pt-4  flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <p className="font-bold">{item.title}</p>
                  <div className="flex items-center ">
                    <MdOutlineAttachMoney className=" h-7 w-7 fill-white" />
                    <p className="font-semibold">{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <p className="mr-2">{item.review}</p>
                  <IoStarSharp className="fill-orange-600 mr-16" />
                  <button className="flex border border-white rounded-md items-center p-1 font-semibold text-sm">
                    ADD
                    <MdAdd className="fill-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex w-ful my-20 justify-center items-center">
          <p className="uppercase text-3xl">
            no <span className="text-amber-400">{foodEndpoint}</span> right now!
          </p>
        </div>
      )}
    </div>
  );
}