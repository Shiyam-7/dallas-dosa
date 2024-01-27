import React, { useEffect } from "react";
import axios from "axios";
import signin from "../assets/images/sign-in.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../redux/slices/authSlice.js";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setError("");
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://dallas-dosa.onrender.com/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      const decoded = jwtDecode(response.data.accessToken);
      console.log(decoded);
      const data = {
        accessToken: response.data.accessToken,
        user: decoded.UserInfo,
      };
      dispatch(login(data));
      setLoading(false);
      toast.success("Logged In Successfully!");
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.response.data.msg === "No User Found!") {
        return setError(error.response.data.msg);
      }
      if (error.response.data.msg === "Incorrect password!") {
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
      <p className="text-3xl font-semibold">Login</p>
      <div className="flex my-10">
        <div className="flex flex-col mx-10 gap-10">
          <div className="flex flex-col gap-3">
            <p className="font-semibold text-2xl">Login with Dallas Dosa</p>
            <p className="text-gray-300 text-sm">
              It's great to see you again! Please log in to continue
            </p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-5">
              <label className="font-semibold">Email Address</label>
              <input
                className="appearance-none bg-transparent border border-amber-400  focus:outline-none p-3 rounded-md"
                type="email"
                placeholder="Enter Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <label className="font-semibold">Password</label>
              <input
                type="password"
                className="appearance-none bg-transparent border border-amber-400  focus:outline-none p-3 rounded-md"
                placeholder="Type Your Password Here"
                value={password}
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
                <button className="w-auto bg-amber-400 hover:opacity-95 py-1 px-7 rounded-2xl">
                  Login
                </button>
              )}

              <p>
                New to Dallas Dosa?{" "}
                <Link to={"/sign-up"}>
                  <span className="font-bold">Sign up here.</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div>
          <img
            className="w-[22rem] max-md:hidden h-[29rem] mx-10"
            src={signin}
            alt="sign up image"
          />
        </div>
      </div>
    </div>
  );
}
