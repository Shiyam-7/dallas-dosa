import React from "react";
import HomeCard from "../components/HomeCard";
import about1 from "../assets/images/about1.png";
import about2 from "../assets/images/about2.png";
import about3 from "../assets/images/about3.png";
import about4 from "../assets/images/about4.png";
import about5 from "../assets/images/about5.png";
import about6 from "../assets/images/about6.png";
import about7 from "../assets/images/about7.png";
import about8 from "../assets/images/about8.png";
import { TiTickOutline } from "react-icons/ti";

export default function AboutUs() {
  return (
    <div className="flex  gap-10 flex-col  my-20 text-white">
      <div className="flex max-md:gap-8 gap-3 flex-col md:flex-row w-full items-center justify-center ">
        <div className="flex gap-3 w-[320px] sm:w-[520px] md:w-[400px] lg:w-[480px] xl:w-[600px] flex-col">
          <div className="flex">
            <p className="text-amber-400 text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
              About Us
            </p>
          </div>
          <div className="flex">
            Welcome to Dallas Dosa where the art of dosa-making meets a passion
            for culinary excellence. Our journey began with a simple vision — to
            create a place where the aroma of freshly prepared dosas would
            tantalize taste buds and bring people together
          </div>
        </div>
        <div className="">
          <img
            className="w-[320px] sm:w-[450px] md:w-[300px] lg:w-[430px] xl:w-[600px] object-cover"
            src={about1}
            alt="one of the cover pics in about page"
          />
        </div>
      </div>
      <div className="flex gap-3 flex-col md:flex-row w-full items-center justify-center">
        <div className="flex gap-3 w-[320px] sm:w-[520px] md:w-[400px] lg:w-[480px] xl:w-[600px] flex-col">
          <div className="flex">
            <p className=" text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
              Uncover{" "}
              <span className="text-amber-400">the world's best dosa</span>{" "}
              concepts and time-honored traditions
            </p>
          </div>
          <div className="flex">
            <p></p>At Dallas Dosa, we believe in quality as the cornerstone of a
            memorable dining experience. We source the finest ingredients,
            ensuring that every dosa served reflects the freshness and
            authenticity we stand for.
          </div>
          <div className="flex gap-12 sm:gap-60 md:gap-32 xl:gap-32">
            <div className="flex items-center">
              <div className="flex justify-start">
                <TiTickOutline className="fill-amber-400" />
              </div>
              <div className="flex justify-start">
                <p>Premium product</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex pl-2 justify-start">
                <TiTickOutline className="fill-amber-400" />
              </div>
              <div className="flex justify-start">
                <p>Rapid delivery</p>
              </div>
            </div>
          </div>
          <div className="flex gap-24 sm:gap-72 md:gap-44  xl:gap-44">
            <div className="flex items-center">
              <div className="flex justify-start">
                <TiTickOutline className="fill-amber-400" />
              </div>
              <div className="flex justify-start">
                <p>Master chef</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex justify-start">
                <TiTickOutline className="fill-amber-400" />
              </div>
              <div className="flex justify-start">
                <p>Ideal spot</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-5 flex-col">
          <div className="items-end gap-5 flex">
            <img
              className="w-[140px] h-[160px] sm:w-[250px] sm:h-[270px] md:w-[140px] md:h-[160px] lg:w-[220px] lg:h-[250px] xl:w-[300px] xl:h-[340px]"
              src={about2}
              alt="one of the cover pics in about page"
            />
            <img
              className="w-[120px] h-[90px] sm:w-[170px] sm:h-[150px] md:w-[110px] md:h-[90px] lg:w-[150px] lg:h-[130px] xl:w-[230px] xl:h-[200px]"
              src={about3}
              alt="one of the cover pics in about page"
            />
          </div>
          <div className=" gap-5 flex">
            <div className="gap-5 flex">
              <img
                className="w-[95px] h-[130px] sm:w-[155px] sm:h-[210px] md:w-[95px] md:h-[120px] lg:w-[135px] lg:h-[180px] xl:w-[205px] xl:h-[230px]"
                src={about4}
                alt="one of the cover pics in about page"
              />
              <img
                className="w-[70px] h-[100px] sm:w-[120px] sm:h-[170px] md:w-[70px] md:h-[90px] lg:w-[100px] lg:h-[140px] xl:w-[150px] xl:h-[170px]"
                src={about5}
                alt="one of the cover pics in about page"
              />
            </div>
            <div className="flex gap-5 flex-col">
              <img
                className="w-[70px] h-[70px] sm:w-[120px] sm:h-[120px] md:w-[70px] md:h-[70px] lg:w-[110px] lg:h-[110px] xl:w-[155px] xl:h-[155px]"
                src={about6}
                alt="one of the cover pics in about page"
              />
              <img
                className="w-[100px] h-[75px] sm:w-[170px] sm:h-[135px] md:w-[100px] md:h-[75px] lg:w-[150px] lg:h-[115px] xl:w-[210px] xl:h-[155px]"
                src={about7}
                alt="one of the cover pics in about page"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex gap-3 flex-col w-full items-center justify-center text-center">
        <div className="text-2xl font-bold">
          <p>Pick and Try out</p>
        </div>
        <div className="w-[770px]">
          <p>
            Food, in the end, in our tradition, is something holy. It's not
            about nutrients and calories. It's about sharing. It's about
            honesty. It's about identity
          </p>
        </div>
      </div> */}
      {/* <div className="flex justify-center flex-wrap">
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
      </div> */}
      <div className="bg-amber-400 p-[1px]"></div>
      <div className="flex md:gap-24 lg:gap-32 flex-col md:flex-row justify-center items-center">
        <div className="">
          <img
            className="object-cover w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:h-[180px] md:w-[180px] lg:h-[230px] lg:w-[230px] xl:w-[280px] xl:h-[280px]"
            src={about8}
            alt="one of the cover pics in about page"
          />
        </div>
        <div className="flex mt-9 ml-7 w-[300px] sm:w-[520px] md:w-[400px] lg:w-[540px] xl:w-[650px]">
          <p className="font-semibold text-xl">
            Exceptional dosas! The variety on the menu is impressive, and each
            one is bursting with flavor. The staff is friendly and provides
            excellent service. A must-visit for dosa enthusiasts!
          </p>
        </div>
      </div>
      <div className="bg-amber-400 p-[1px]"></div>
    </div>
  );
}
