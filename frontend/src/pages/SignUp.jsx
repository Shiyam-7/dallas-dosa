import React from "react";
import axios from "axios";
import signup from "../assets/images/sign-up.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUP() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3000/api/auth/signup", {
          username,
          email,
          address,
          password,
        })
        .then((data) => {
          console.log(data.data.msg);
          navigate("/sign-in");
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    } catch (error) {
      console.log(error);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };
  return (
    <div className="flex flex-col my-10 items-center justify-center text-white">
      <p className="text-3xl font-semibold">Registration</p>
      <div className="flex my-10">
        <div className="flex flex-col mx-10 gap-10">
          <div className="flex flex-col gap-3">
            <p className="font-semibold text-2xl">Register with Dallas Dosa</p>
            <p className="text-gray-300 text-sm">
              Welcome! Register below to unlock exclusive benefits
            </p>
          </div>
          <form onSubmit={handleSignup}>
            <div className="flex flex-col gap-5">
              <label className="font-semibold">User Name</label>
              <input
                className="appearance-none bg-transparent border border-amber-400  focus:outline-none p-3 rounded-md"
                type="text"
                placeholder="Enter Your Name"
                onChange={(e) => setUsername(e.target.value)}
              ></input>
              <label className="font-semibold">Email Address</label>
              <input
                className="appearance-none bg-transparent border border-amber-400  focus:outline-none p-3 rounded-md"
                type="email"
                placeholder="Enter Email Id"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <label className="font-semibold">Address</label>
              <input
                className="appearance-none bg-transparent border border-amber-400  focus:outline-none p-3 rounded-md"
                type="text"
                placeholder="Enter Address"
                onChange={(e) => setAddress(e.target.value)}
              ></input>
              <label className="font-semibold">Password</label>
              <input
                type="password"
                className="appearance-none bg-transparent border border-amber-400  focus:outline-none p-3 rounded-md"
                placeholder="Type Your Password Here"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <div className="flex justify-between">
                <div className="flex">
                  <input
                    className=" h-5 w-5 cursor-pointer rounded-md"
                    type="checkbox"
                  />
                  <p className="ml-2 text-gray-300">Remember me!</p>
                </div>
                <div>
                  <p className="text-gray-300">Forgot Password?</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-5 gap-5">
              <button className="w-auto bg-amber-400 hover:opacity-95 py-1 px-7 rounded-2xl">
                Register
              </button>
              <p>
                Returning user?{" "}
                <Link to={"/sign-in"}>
                  <span className="font-bold">Log in now.</span>
                </Link>
              </p>
            </div>
          </form>
          {error && (
            <div className="text-red-700">
              Wrong credentials! Try different ones.
            </div>
          )}
        </div>
        <div className="flex items-center justify-center">
          <img
            className="w-[29rem] h-[36rem] mx-10 "
            src={signup}
            alt="sign up image"
          />
        </div>
      </div>
    </div>
  );
}
