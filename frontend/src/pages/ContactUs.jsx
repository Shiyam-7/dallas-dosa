import React from "react";
import contactus from "../assets/images/contact-us.png";

export default function SignUP() {
  return (
    <div className="flex flex-col my-10 text-white">
      <div className="flex items-center justify-center">
        <p className="text-3xl font-semibold">Contact Us</p>
      </div>

      <div className="flex justify-center gap-10 my-10">
        <div className="flex">
          <img
            className="w-[20rem] h-[27rem] mx-10"
            src={contactus}
            alt="contact us image"
          />
        </div>
        <div className="flex justify-center flex-col gap-10">
          <form>
            <div className="flex flex-col gap-10">
              <input
                className="placeholder:text-white appearance-none bg-transparent border border-amber-400  focus:outline-none p-3 rounded-md"
                type="text"
                placeholder="Name"
              ></input>
              <input
                className="placeholder:text-white appearance-none bg-transparent border border-amber-400  focus:outline-none p-3 rounded-md"
                type="text"
                placeholder="Phone Number"
              ></input>
              <input
                className="placeholder:text-white appearance-none bg-transparent border border-amber-400  focus:outline-none p-3 rounded-md"
                type="email"
                placeholder="E Mail"
              ></input>
              <input
                className="placeholder:text-white appearance-none bg-transparent border border-amber-400  focus:outline-none p-3 rounded-md"
                type="text"
                placeholder="Review"
              ></input>
            </div>
            <div className="flex flex-col items-center mt-8 gap-5">
              <button className="w-auto bg-amber-400 hover:opacity-95 py-1 px-7 rounded-2xl">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
