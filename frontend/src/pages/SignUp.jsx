import React from "react";
import axios from "axios";
import signup from "../assets/images/sign-up.png";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";

export default function SignUP() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setError("");
  }, [email, password, username, address]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://18.118.197.9:3000/api/auth/signup",
        {
          username,
          email,
          address,
          password,
        }
      );
      console.log(response);
      setLoading(false);
      toast.success("Signed Up Successfully!");
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.response.data.msg === "User already exists!") {
        return setError(error.response.data.msg);
      }
      if (
        error.response.data.msg ===
        "Oops!! Something went wrong! Please try again."
      ) {
        return setError(error.response.data.msg);
      }
      if (error.response.data.msg === "Invalid Email or Password!") {
        return setError(error.response.data.msg);
      }
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
              {error && (
                <div>
                  <p className="text-red-700">{error}</p>
                </div>
              )}
              {loading ? (
                <button
                  disabled
                  className="w-auto bg-amber-400 opacity-95 py-1 px-7 rounded-2xl"
                >
                  Loading...
                </button>
              ) : (
                <>
                  <button className="w-auto bg-amber-400 hover:opacity-95 py-1 px-7 rounded-2xl">
                    Login
                  </button>
                  <Oauth />
                </>
              )}
              <p>
                Returning user?{" "}
                <Link to={"/sign-in"}>
                  <span className="font-bold">Log in now.</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center">
          <img
            className="w-[29rem] max-md:hidden h-[36rem] mx-10 "
            src={signup}
            alt="sign up image"
          />
        </div>
      </div>
    </div>
  );
}
