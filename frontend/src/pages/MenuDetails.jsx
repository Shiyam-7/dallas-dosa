import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice";
import { BiMinus } from "react-icons/bi";
import { TailSpin } from "react-loader-spinner";

export default function MenuDetails() {
  const [loading, setLoading] = useState(true);
  const [foodDetails, setFoodsDetails] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/products/find/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setFoodsDetails(data);
    };
    fetchFoodDetails();
    setLoading(false);
  }, [id]);

  const changeQuantity = (command) => {
    if (command === "dec") {
      if (quantity === 1) return;
      setQuantity((prev) => prev - 1);
    } else if (command === "inc") {
      setQuantity((prev) => prev + 1);
    }
  };

  const addToCart = () => {
    dispatch(addToCart({ ...foodDetails, quantity }));
  };
  return (
    <div className="flex">
      {loading ? (
        <TailSpin // Type of spinner
          className="w-[100%] h-[100%]"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
        />
      ) : (
        <div className="flex w-[950px] my-10 mx-auto  flex-col p-3 text-white">
          <div className="flex ">
            <img
              className="h-[500px] rounded-3xl w-[900px] object-cover"
              src={`http://localhost:3000/images/${foodDetails.imageLink}`}
              alt="food item cover image"
            />
          </div>
          <div className="pt-4  flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="font-bold">{foodDetails.title}</p>
              <div className="">
                <p className="font-light">{foodDetails.description}</p>
              </div>
              <div className="flex items-center ">
                <MdOutlineAttachMoney className=" h-7 w-7 fill-white" />
                <p className="font-semibold">{foodDetails.price}</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <p className="mr-2">{foodDetails.rating}</p>
              <IoStarSharp className="fill-orange-600 mr-16" />
              <button
                disabled={quantity === 1}
                onClick={() => {
                  changeQuantity("dec");
                }}
                className="flex disabled:opacity-50 hover:border-amber-400 border border-white rounded-md items-center p-1 font-semibold text-sm"
              >
                <BiMinus className="fill-white" />
              </button>
              <p className="mx-3">{quantity}</p>
              <button
                onClick={() => {
                  changeQuantity("inc");
                }}
                className="flex border hover:border-amber-400 border-white rounded-md items-center p-1 font-semibold text-sm"
              >
                <MdAdd className="fill-white" />
              </button>
              <button
                onClick={addToCart}
                className="ml-5 bg-amber-400 hover:opacity-95 p-1 text-sm rounded-2xl"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
