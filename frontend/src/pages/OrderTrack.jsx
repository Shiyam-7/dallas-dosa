import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Map from "../components/Map";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function OrderTrack() {
  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [order, setOrder] = useState();
  console.log(order);

  const fetchOrder = async (id) => {
    const res = await fetch(
      `http://localhost:3000/api/orders/track-order/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    id &&
      fetchOrder(id).then((data) => {
        setOrder(data);
      });
  }, []);

  if (!id)
    return (
      <div className="">
        <p>Not Found!</p>
      </div>
    );
  return (
    order && (
      <div className="text-white">
        <div className="flex items-center justify-center my-10">
          {/* paste card below */}

          {/* card ends above */}
        </div>
        <div className="flex justify-center items-center gap-5">
          <div className="flex flex-col gap-5">
            <div className="items-center justify-start text-xl font-bold">
              Order Placed:
            </div>
            <div className="items-center justify-start text-xl font-bold">
              Order ID : {order._id}
            </div>
            <div className="items-center justify-start text-xl font-bold">
              Payment ID : {order.paymentId}
            </div>
            <div className="items-center justify-start text-xl font-bold">
              {order.products.length} items:
            </div>
            <div className="flex flex-col ">
              {order.products.map((item) => (
                <div className="flex flex-wrap " key={item._id}>
                  <p>{item.title} - </p> <p> quantity: {item.quantity}</p>
                </div>
              ))}

              <div className="flex items-start mt-3 flex-col gap-6">
                <div className="flex items-center">
                  <MdOutlineAttachMoney className=" h-5 w-5 fill-white" />
                  <p>{order.totalPrice}</p>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-5">
              <form action="">
                <div className="flex">
                  <p>Your Name: {order.username}</p>
                </div>
                <div className="flex mt-2">
                  <p>Delivery Address: {order.address}</p>
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="flex">
              <p className="text-2xl font-bold">Your Location</p>
            </div>
            <div className="flex w-full justify-center items-center">
              <Map readonly={true} location={order.addressLatLng} />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
