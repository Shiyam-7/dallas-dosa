import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/slices/authSlice";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export default function CurrentOrders() {
  const dispatch = useDispatch();
  const [currentOrders, setCurrentOrders] = useState([]);
  const { token, user } = useSelector((state) => state.auth);
  const getCurrentOrders = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/orders/getCurrentOrders",
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
          const response = await axios.get(
            "http://localhost:3000/api/refresh-token",
            { withCredentials: true }
          );
          console.log(response);
          const userinfo = { ...response.data, user };
          dispatch(login(userinfo));
          const res = await fetch(
            "http://localhost:3000/api/orders/getCurrentOrders",
            {
              headers: {
                Authorization: `Bearer ${userinfo.accessToken}`,
              },
              credentials: "include",
            }
          );
          const data = await res.json();
          console.log(data);
          setCurrentOrders(data);
        } catch (error) {
          console.log(error);
        }
      } else {
        setCurrentOrders(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentOrders();
  }, []);

  const orderDelivered = async (id) => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/orders/orderDelivered",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "PUT",
          credentials: "include",
          body: JSON.stringify({
            _id: id,
          }),
        }
      );
      console.log(res.status);
      const data = await res.json();
      console.log(data);
      if (data.msg === "jwt expired") {
        try {
          console.log("2");
          const response = await axios.get(
            "http://localhost:3000/api/refresh-token",
            { withCredentials: true }
          );
          console.log(response);
          const userinfo = { ...response.data, user };
          dispatch(login(userinfo));
          console.log("3");
          const res = await fetch(
            "http://localhost:3000/api/orders/orderDelivered",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userinfo.accessToken}`,
              },
              method: "PUT",
              credentials: "include",
              body: JSON.stringify({
                _id: id,
              }),
            }
          );
          const data = await res.json();
          console.log(data);
          getCurrentOrders();
          toast.success("Success!");
        } catch (error) {
          console.log(error);
        }
      } else {
        getCurrentOrders();
        toast.success("Succes!");
      }
    } catch (error) {
      toast.error();
      console.log(error);
    }
  };

  return (
    <div className="flex w-full justify-center h-screen text-white my-5">
      {currentOrders.length !== 0 ? (
        currentOrders.map((order) => (
          <div
            key={order._id}
            className=" h-fit  my-5  flex border border-amber-400 p-3"
          >
            <div className="flex border border-amber-400 p-3 flex-col">
              <div className="">
                <p>
                  <span className="text-xl mr-2 font-semibold">Order ID:</span>{" "}
                  <span className=" font-mono text-sm">{order.id}</span>
                </p>
              </div>
              <div className="">
                <p>
                  <span className="text-xl mr-2 font-semibold">
                    Payment ID:
                  </span>{" "}
                  <span className=" font-mono text-sm">{order.paymentId}</span>
                </p>
              </div>
              <div className="">
                <p>
                  <span className="text-xl mr-2 font-semibold">
                    Customer Name:
                  </span>{" "}
                  <span className=" font-mono text-sm">{order.name}</span>
                </p>
              </div>
              <div className="">
                <p>
                  <span className="text-xl mr-2 font-semibold">
                    Customer Address:
                  </span>{" "}
                  <span className=" font-mono text-sm">{order.address}</span>
                </p>
              </div>
            </div>
            <div className="flex border border-amber-400 p-3 justify-center items-center  flex-col">
              {order.products.length !== 0 &&
                order.products.map((product) => (
                  <div
                    key={product._id}
                    className="flex justify-between  w-full gap-5 "
                  >
                    <div className="flex ">
                      <p>
                        <span className="text-xl font-semibold">
                          Food Name:
                        </span>{" "}
                        <span className=" font-mono text-sm">
                          {product.title}
                        </span>
                      </p>
                    </div>
                    <div className="flex ">
                      <p>
                        <span className="text-xl font-semibold">Quantity:</span>{" "}
                        <span className=" font-mono text-sm">
                          {product.quantity}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className=" ml-3 items-center flex">
              <button
                onClick={() => {
                  orderDelivered(order._id);
                }}
                className="text-sm  h-fit  bg-amber-400 hover:opacity-95 py-1 px-3 rounded-2xl"
              >
                Order Delivered
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="my-5 flex justify-center items-center w-full">
          <p className="text-2xl font-semibold">No Current Orders</p>
        </div>
      )}
    </div>
  );
}
