import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CurrentOrders() {
  const [currentOrders, setCurrentOrders] = useState([]);
  const { token } = useSelector((state) => state.auth);
  console.log(currentOrders);
  const getCurrentOrders = async () => {
    console.log("hi");
    const res = await fetch("http://localhost:3000/orders/getCurrentOrders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setCurrentOrders(data);
  };

  useEffect(() => {
    getCurrentOrders();
  }, []);

  const orderDelivered = async (id) => {
    console.log(id);
    try {
      const res = await fetch("http://localhost:3000/orders/orderDelivered", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: JSON.stringify({
          _id: id,
        }),
      });
      const data = await res.json();
      console.log(data);
      getCurrentOrders();
      toast.success(data);
    } catch (error) {
      toast.error(error.message);
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
