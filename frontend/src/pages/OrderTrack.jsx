import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Map from "../components/Map";
import { MdOutlineAttachMoney } from "react-icons/md";
import { login } from "../redux/slices/authSlice";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function OrderTrack() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [order, setOrder] = useState();
  console.log(order);

  const fetchOrder = async (id) => {
    try {
      const res = await fetch(
        `https://dallas-dosa.onrender.com/api/orders/track-order/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.msg === "jwt expired") {
        try {
          console.log("2");
          const response = await axios.get(
            "https://dallas-dosa.onrender.com/api/refresh-token",
            { withCredentials: true }
          );
          console.log(response);
          const userinfo = { ...response.data, user };
          dispatch(login(userinfo));
          console.log("3");
          const res = await fetch(
            `https://dallas-dosa.onrender.com/api/orders/track-order/${id}`,
            {
              headers: {
                Authorization: `Bearer ${userinfo.accessToken}`,
              },
              credentials: "include",
            }
          );
          const data = await res.json();
          console.log(data);
          return data;
        } catch (error) {
          console.log(error);
        }
      } else {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
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
