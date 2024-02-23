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
import { TailSpin } from "react-loader-spinner";

export default function Cart() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { cartItems } = useSelector((state) => state.cart);
  const { token, user } = useSelector((state) => state.auth);
  const [order, setOrder] = useState({ ...cartItems });
  const [address, setAddress] = useState("");
  const [addressLatLng, setAddressLatLng] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(address);
  useEffect(() => {
    setAddress(user.address);
  }, []);

  console.log(address);

  let totalPrice = 0;
  cartItems.length !== 0 &&
    cartItems.map(
      (product) => (totalPrice += product.quantity * product.price)
    );

  const handleRemoveProduct = (id) => {
    console.log(id);
    dispatch(removeFromCart({ _id: id }));
  };
  const handleOrder = async () => {
    try {
      setLoading(true);
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
            "http://localhost:3000/api/orders/new-order",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userinfo.accessToken}`,
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
          setLoading(false);
          navigate("/payment");
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      } else {
        setLoading(false);
        navigate("/payment");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col my-10 items-center justify-center text-white">
      {loading ? (
        <div className="flex w-full items-center justify-center my-10">
          <TailSpin // Type of spinner
            className="w-[100%] h-[100%]"
            color="#FFBF00"
            ariaLabel="tail-spin-loading"
          />
        </div>
      ) : (
        <>
          <div className="font-semibold text-3xl">Checkout</div>
          <div className="flex flex-wrap justify-center items-center max-md:flex-col  my-10">
            {/* paste card below */}
            {cartItems.length > 0 ? (
              cartItems.map((product) => (
                <div
                  key={product._id}
                  className="flex  gap-5 m-4 border border-amber-400 p-5"
                >
                  <div className="flex flex-shrink-0">
                    <img
                      className="flex w-[150px] h-[150px]  object-cover"
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
          <div className="flex max-md:flex-col justify-center items-center gap-5">
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
        </>
      )}
    </div>
  );
}
