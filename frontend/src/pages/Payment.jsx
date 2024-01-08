import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdOutlineAttachMoney } from "react-icons/md";
import Map from "../components/Map";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Paypal from "../components/Paypal";

export default function Payment() {
  const [order, setOrder] = useState();
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log("ji");
    const fetchOrder = async () => {
      const res = await fetch(
        "http://localhost:3000/orders/newOrderForCurrentUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setOrder(data);
    };
    fetchOrder();
  }, []);

  if (!order) return;
  return (
    <div className="flex flex-col text-white">
      <div className="flex items-center justify-center my-10">
        {/* paste card below */}
        {order.products.length > 0 ? (
          order.products.map((product) => (
            <div
              key={product._id}
              className="flex flex-wrap gap-5 m-4 border border-amber-400 p-5"
            >
              <div>
                <img
                  className="w-[14rem] object-cover h-[9rem]"
                  src={`http://localhost:3000/images/${product.img}`}
                  alt="product image"
                />
              </div>
              <div className="flex gap-5 items-start justify-center flex-col">
                <p>{product.title}</p>
                <div className="flex items-center ">
                  <MdOutlineAttachMoney className=" h-5 w-5 fill-white" />
                  <p>{product.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p>
                    <span className="font-extralight">Quantity:</span>{" "}
                    {product.quantity}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveProduct(product._id)}
                className="self-start"
              >
                <IoIosCloseCircleOutline />
              </button>
            </div>
          ))
        ) : (
          <h1 className="font-semibold text-xl">No items in the cart.</h1>
        )}
        {/* card ends above */}
      </div>
      <div className="flex justify-center items-center gap-5">
        <div className="flex flex-col gap-5">
          <div className="items-center justify-start text-xl font-bold">
            {order.products.length} items:
          </div>
          <div className="flex gap-16">
            <div className="flex flex-col gap-6">
              <p>Apply Offer & Deals</p>
              <p>Cart Total:</p>
            </div>
            <div className="flex items-start flex-col gap-6">
              <button className="text-sm bg-amber-400 hover:opacity-95 py-1 px-2 rounded-2xl">
                View All
              </button>
              <div className="flex items-center">
                <MdOutlineAttachMoney className=" h-5 w-5 fill-white" />
                <p>{order.totalPrice}</p>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-5">
            <form action="">
              <div className="flex">
                <input
                  disabled
                  className="w-full appearance-none bg-transparent border border-amber-400  focus:outline-none p-1 rounded-md"
                  value={order.name}
                  type="text"
                />
              </div>
              <div className="flex mt-2">
                <input
                  className="w-full appearance-none bg-transparent border border-amber-400  focus:outline-none p-1 rounded-md"
                  type="text"
                  disabled
                  value={order.address}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="flex">
            <p className="text-2xl font-bold">Choose Your Location</p>
          </div>
          <div className="flex w-full justify-center items-center">
            <Map readonly={true} location={order.addressLatLng} />
          </div>
        </div>
      </div>
      <div className="">
        <button>
          <Paypal order={order} />
        </button>
      </div>
    </div>
  );
}