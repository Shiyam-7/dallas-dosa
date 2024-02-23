import React from "react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Oauth = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOauth = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch(
        "https://testing.dallasdosa.com/api/auth/google",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: resultsFromGoogle.user.displayName,
            email: resultsFromGoogle.user.email,
          }),
        }
      );
      const response = await res.json();
      console.log(response);
      if (response.msg === "User created successfully!") {
        toast.success(response.msg);
        navigate("/sign-in");
        return;
      }
      if (res.ok) {
        const decoded = jwtDecode(response.accessToken);
        console.log(decoded);
        const data = {
          accessToken: response.accessToken,
          user: decoded.UserInfo,
        };
        console.log(data);
        dispatch(login(data));
        toast.success("Logged In Successfully!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="flex items-center justify-center gap-5 w-auto bg-amber-400 hover:opacity-95 py-1 px-5 rounded-2xl"
      type="button"
      onClick={handleOauth}
    >
      <FaGoogle className="w-[20px] h-[20px] fill-black" />
      Continue with Google
    </button>
  );
};

export default Oauth;
