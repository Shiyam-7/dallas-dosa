import React from "react";
import { Link } from "react-router-dom";
import home1 from "../assets/images/home1.png";
import home2 from "../assets/images/home2.png";
import home3 from "../assets/images/home3.png";
import home4 from "../assets/images/home4.png";
import home5 from "../assets/images/home5.svg";
import Restaurant from "../assets/images/restaurant.svg";
import FastDelivery from "../assets/images/fast-delivery.svg";
import buyonegetone from "../assets/images/buy1-get1.png";
// import ellipse1 from "../assets/images/ellipse1.png";
// import ellipse2 from "../assets/images/ellipse2.png";
import ellipse3 from "../assets/images/ellipse3.png";
import gallery1 from "../assets/images/gallery1.png";
import gallery2 from "../assets/images/gallery2.png";
import gallery3 from "../assets/images/gallery3.png";
import gallery4 from "../assets/images/gallery4.png";
import { RiDoubleQuotesL } from "react-icons/ri";
import { TfiLineDashed } from "react-icons/tfi";

export default function Home() {
  return (
    <div className="flex  gap-10 flex-col  my-20 text-white">
      <div className="flex gap-3 flex-col md:flex-row w-full items-center justify-center">
        <div className="flex gap-3 w-[320px] sm:w-[520px] md:w-[400px] lg:w-[480px] xl:w-[600px] flex-col">
          <div className="flex">
            <p className=" text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
              Step into <span className="text-amber-400">Dallas Dosa</span>{" "}
              Where South Indian Flavors Come 2 Life."
            </p>
          </div>
          <div className="flex ">
            A Symphony of South Indian Flavors Indulge in the artistry of dosa
            at Dallas Dosa. Our culinary journey takes you on a voyage through
            the heart of South India, where tradition and innovation converge on
            your plate.
          </div>
          <div className="flex w-fit bg-amber-400 hover:opacity-95 py-1 px-2 rounded-2xl">
            <Link to={"/category"}>Order Now</Link>
          </div>
        </div>
        <div className="">
          <img
            className="w-[320px] sm:w-[450px] md:w-[300px] lg:w-[430px] xl:w-[600px] object-cover"
            src={home1}
            alt="one of the cover photo in home page"
          />
        </div>
      </div>
      <div className="flex gap-10 flex-col md:flex-row w-full items-center justify-center">
        <div className="">
          <img
            className="w-[320px] sm:w-[450px] md:w-[300px] lg:w-[430px] xl:w-[600px] 2xl:w-[650px] object-cover"
            src={home2}
            alt="one of the cover photo in home page"
          />
        </div>
        <div className="flex gap-3 w-[320px] sm:w-[520px] md:w-[400px] lg:w-[480px] xl:w-[600px] 2xl:w-[700px]  max-md:items-center max-md:justify-center flex-col">
          <div className="flex">
            <p className="text-amber-400">TASTE THE TRADITION</p>
          </div>
          <div className="flex">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold">
              Uncover the authentic flavors of{" "}
              <span className="text-amber-400">South India</span> with every
              dosa at Dallas Dosa
            </p>
          </div>
          <div className="flex  ">
            Welcome to Dallas Dosa, where every dosa tells a story of tradition,
            passion, and culinary excellence. Established with a deep love for
            South Indian cuisine, our journey began [X years ago] with the
            vision of bringing the authentic flavors of dosas to Irving .
          </div>
          <div className="flex w-fit bg-amber-400 hover:opacity-95 py-1 px-2 rounded-2xl">
            <Link to={"/about-us"}>Know More</Link>
          </div>
          <div className="flex gap-4 items-center">
            <div className="">
              <img src={Restaurant} alt="restaurant cutlery pic" />
            </div>
            <div className="">
              <p>Tasty Food</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="">
              <img src={FastDelivery} alt="fast delivery pic" />
            </div>
            <div className="">Fast delivery</div>
          </div>
        </div>
      </div>
      <div className="bg-amber-400 flex gap-8 lg:gap-14 xl:gap-16 flex-col  md:flex-row items-center justify-center py-5 md:py-10 ">
        <div className="flex max-md:justify-center max-md:items-center gap w-[320px] sm:w-[520px] md:w-[400px] lg:w-[480px] xl:w-[580] 2xl:w-[700px] flex-col md:mr-10 text-black">
          <div className="flex text-base sm:text-lg lg:text-xl xl:text-2xl font-bold">
            <p>Don't miss out on these delectable offers!</p>
          </div>
          <div className="flex text-xs  sm:text-sm lg:text-base xl:text-lg  font-semibold">
            <p>Come savor the goodness of dosas at Dosa Delights today.</p>
          </div>
        </div>
        <div className="flex ">
          <input
            className="focus:outline-none text-black font-light p-1 w-[250px] sm:w-[300px] md:w-[250px] lg:w-[350px] xl:w-[400px]"
            type="email"
            placeholder="Enter Your Email"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row  justify-center items-center gap-4 xl:gap-8">
        <div className="flex gap-10 sm:gap-14 flex-col   ">
          <div className="flex sm:gap-14 md:gap-0 items-center justify-center">
            <div className="flex gap-3 sm:gap-10 md:gap-3 flex-col">
              <div className="flex gap-2 w-[150px] sm:w-[200px] xl:w-[240px] ">
                <p className="text-lg sm:text-xl xl:text-2xl font-bold">
                  Treat yourself to our tasty delight
                </p>
              </div>
              <div className="flex w-fit bg-amber-400 hover:opacity-95 py-1 px-2 rounded-2xl">
                <Link to={"/category"}>Order Now</Link>
              </div>
            </div>
            <div className="">
              <img
                className="object-cover w-[150px] sm:w-[220px] md:w-[130px] lg:w-[180px] xl:w-[260px]"
                src={home3}
                alt="one of the cover photo in home page"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-14 md:gap-0 justify-center">
            <div className="flex gap-3 sm:gap-10 md:gap-3 flex-col">
              <div className="flex w-[150px] sm:w-[200px] xl:w-[240px]">
                <p className="text-lg sm:text-xl xl:text-2xl font-bold">
                  Rapid food delivery service
                </p>
              </div>
              <div className="flex w-fit bg-amber-400 hover:opacity-95 py-1 px-2 rounded-2xl">
                <Link to={"/category"}>Order Now</Link>
              </div>
            </div>
            <div className="">
              <img
                className="object-cover w-[150px] md:w-[130px] sm:w-[220px] lg:w-[180px] xl:w-[260px]"
                src={home4}
                alt="one of the cover photo in home page"
              />
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex ">
            <img
              className="w-[300px] sm:w-[485px] md:w-[375px] lg:w-[500px] object-cover xl:w-[670px] "
              src={buyonegetone}
              alt="buy one get one image"
            />
            <div className="flex mt-24 sm:mt-40 md:mt-28 ml-16 sm:ml-32 md:ml-20 lg:mt-36 lg:ml-24 xl:mt-52 xl:ml-36 absolute ">
              <div className="absolute font-bold text-xl sm:text-3xl md:text-2xl lg:text-4xl xl:text-5xl">
                <p className="-rotate-[30deg] ml-1 mt-2 xl:mt-4 ">Buy 1</p>
                <p className="ml-10 sm:ml-16 md:ml-14 lg:ml-20 lg:mt-4 sm:mt-1 ">
                  Get 1
                </p>
                <p className="-rotate-[20deg] ml-8 sm:mt-1 sm:ml-12 lg:mt-3 lg:ml-16 text-red-700">
                  FREE
                </p>
              </div>

              <img
                className="w-[100px] sm:w-[150px] md:w-[130px] lg:w-[180px] xl:w-[220px]"
                src={home5}
                alt="one of the cover photo in home page"
              />
            </div>
            <div className="flex ml-1 mt-1 sm:ml-3 md:ml-1 md:mt-1 sm:mt-3 lg:mt-3 lg:ml-3  gap-1 sm:gap-3 flex-col absolute">
              <div className="">
                <p className="w-[180px] sm:w-[280px] md:w-[220px] lg:w-[270px] xl:w-[400px] text-xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-5xl font-bold">
                  Special Delicious Masala Dosa
                </p>
              </div>
              <div className="flex w-fit bg-amber-400 hover:opacity-95 py-1 px-2 rounded-2xl">
                <Link to={"/category"}>Order Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col gap-3 items-center justify-center">
        <p className="text-2xl font-bold">Pick and Try out</p>
        <p className="w-[770px] text-center">
          Food, in the end, in our tradition, is something holy. It's not about
          nutrients and calories. It's about sharing. It's about honesty. It's
          about identity
        </p>
      </div>
      <div className="flex flex-wrap">
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
      </div> */}
      <div className="bg-amber-400 p-[1px]"></div>
      <div className="flex md:flex-row flex-col items-center justify-center">
        <div className="flex flex-col">
          <div className="flex gap-8  ">
            {/* <img
              className="w-[80px] max-md:hidden h-[80px] xl:w-[100px] xl:h-[100px]"
              src={ellipse1}
              alt="cover picture"
            /> */}
            <img
              className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:h-[180px] md:w-[180px] lg:h-[230px] lg:w-[230px] xl:w-[280px] xl:h-[280px]"
              src={ellipse3}
              alt="cover picture"
            />
          </div>
          {/* <div className="flex justify-center mr-20 items-center">
            <img
              className=" w-[80px] max-md:hidden h-[80px] xl:w-[100px] xl:h-[100px]"
              src={ellipse2}
              alt="cover picture"
            />
          </div> */}
        </div>
        <div className="flex -mr-10 lg:-mr-10 lg:-ml-10">
          <TfiLineDashed className="max-md:hidden md:rotate-90 fill-amber-400 w-[150px] h-[150px] lg:w-[200px] lg:h-[200px]" />
        </div>
        <div className="flex gap-3 flex-col">
          <div className="absolute">
            <RiDoubleQuotesL className="fill-amber-400  w-[60px] h-[60px]" />
          </div>
          <div className="flex mt-9 ml-7 w-[300px] sm:w-[520px] md:w-[400px] lg:w-[540px] xl:w-[650px]">
            <p className="text-xl font-semibold">
              I recently had the pleasure of dining at Dallas Dosa, and it was
              an absolute delight indeed! The restaurant specializes in serving
              a variety of dosa, and I must say, they have mastered the art.
            </p>
          </div>
          <div className="flex  ml-7 flex-col gap-1">
            <p className="font-mono">Tanvi</p>
            <p className="font-extralight">-Dallas Dosa Customer</p>
          </div>
        </div>
      </div>
      <div className="bg-amber-400 p-[1px]"></div>
      <div className="flex  gap-3 w-full justify-center items-center">
        <div className="flex flex-col gap-5 w-[300px] sm:w-[500px] md:w-[700px] lg:w-[960px] xl:w-[1200px] justify-center items-center">
          <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold">
            Dallas Dosa Gallery
          </p>
          <p className=" flex">
            Embark on a culinary canvas at our Dosa Gallery, where each
            masterpiece is a symphony of flavors, a dance of textures, and a
            celebration of South Indian heritage – savor the artistry of dosas
            like never before!
          </p>
        </div>
      </div>
      <div className="gap-5 justify-center  items-center  flex-col md:flex-row  flex">
        <div className="flex gap-5">
          <img
            className="w-[140px] sm:w-[230px] md:w-[150px] lg:w-[220px] xl:w-[280px]"
            src={gallery1}
            alt="cover pic"
          />
          <img
            className="w-[140px] sm:w-[230px] md:w-[150px] lg:w-[220px] xl:w-[280px]"
            src={gallery2}
            alt="cover pic"
          />
        </div>
        <div className="flex gap-5">
          <img
            className="w-[140px] sm:w-[230px] md:w-[150px] lg:w-[220px] xl:w-[280px]"
            src={gallery3}
            alt="cover pic"
          />
          <img
            className="w-[140px] sm:w-[230px] md:w-[150px] lg:w-[220px] xl:w-[280px]"
            src={gallery4}
            alt="cover pic"
          />
        </div>
      </div>
    </div>
  );
}
