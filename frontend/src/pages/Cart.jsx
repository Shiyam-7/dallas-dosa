import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../redux/slices/cartSlice";
import { MdOutlineAttachMoney, MdAdd } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Map from "../components/Map";
import { latLng } from "leaflet";
import axios from "axios";

export default function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const { token, user } = useSelector((state) => state.auth);
  const [order, setOrder] = useState({ ...cartItems });
  const [address, setAddress] = useState("");
  console.log(address);
  useEffect(() => {
    setAddress(user.address);
  }, []);

  console.log(address);
  const [addressLatLng, setAddressLatLng] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let totalPrice = 0;
  cartItems.length !== 0 &&
    cartItems.map(
      (product) => (totalPrice += product.quantity * product.price)
    );

  const handleRemoveProduct = (id) => {
    console.log(id);
    dispatch(removeFromCart({ _id: id }));
  };
  // const refresh = async () => {};
  const handleOrder = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/orders/new-order", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          username: user.username,
          address,
          addressLatLng,
          totalPrice,
          products: cartItems,
        }),
      });
      const data = await res.json();
      console.log(data);
      console.log(data.msg);
      if (data.msg === "jwt expired") {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/refresh-token",
            { withCredentials: true }
          );
          console.log(response.data);
          const userinfo = { ...response.data, user };
          console.log(userinfo);
          dispatch(login(userinfo));

          const res = await fetch(
            "http://localhost:3000/api/orders/new-order",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              method: "POST",
              credentials: "include",
              body: JSON.stringify({
                username: user.username,
                address,
                addressLatLng,
                totalPrice,
                products: cartItems,
              }),
            }
          );
          const data = await res.json();

          console.log(data);
          navigate("/payment");
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col my-10 items-center justify-center text-white">
      <div className="font-semibold text-3xl">Checkout</div>
      <div className="flex my-10">
        {/* paste card below */}
        {cartItems.length > 0 ? (
          cartItems.map((product) => (
            <div
              key={product._id}
              className="flex flex-wrap gap-5 m-4 border border-amber-400 p-5"
            >
              <div>
                <img
                  className="w-[14rem] object-cover h-[9rem]"
                  src={`http://localhost:3000/images/${product.imageLink}`}
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
            {cartItems.length} items:
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
                <p>{totalPrice}</p>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-5">
            <form action="">
              <div className="flex">
                <input
                  disabled
                  className="w-full appearance-none bg-transparent border border-amber-400  focus:outline-none p-1 rounded-md"
                  value={user.username}
                  type="text"
                />
              </div>
              <div className="flex mt-2">
                <input
                  className="w-full appearance-none bg-transparent border border-amber-400  focus:outline-none p-1 rounded-md"
                  type="text"
                  value={address}
                  placeholder="Enter Your Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </form>
          </div>
          <button
            onClick={handleOrder}
            disabled={cartItems.length === 0}
            className="bg-amber-400 disabled:opacity-80 w-fit mx-auto mt-5 hover:opacity-95 px-10 py-2 rounded-3xl"
          >
            Proceed to payment
          </button>
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="flex">
            <p className="text-2xl font-bold">Choose Your Location</p>
          </div>
          <div className="flex w-full justify-center items-center">
            <Map
              location={order.addressLatLng}
              onChange={(latlng) => {
                console.log(latlng);
                console.log(cartItems);
                setAddressLatLng(latlng);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
