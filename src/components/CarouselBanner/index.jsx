import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import LinkButton from "../ui/link";
import { classNames } from "../../utils/classname";
import smoothscroll from "smoothscroll-polyfill";
import { useNavigate } from "react-router-dom";
smoothscroll.polyfill();
function CarouselBanner() {
  const navigator = useNavigate();

  function ApplyBox() {
    return (
      <span className="absolute top-16 md:top-36 left-6 md:left-32 z-50 md:w-[500px] w-80  rounded-lg md:h-56 h-44 bg-blue-50/40 ">
        <div className="p-4 flex flex-col items-start gap-4 justify-start">
          <p className="md:text-5xl text-3xl text-left text-blue-800 font-extrabold">
            <p>
              {" "}
              Capital Group Business{" "}
              <p className="text-red-600 ">Solution PVT. LTD.</p>
            </p>
          </p>

          <div className="flex md:mt-4 mt-1 items-center gap-4">
            <button
              onClick={() => {
                navigator("/contact-us");
              }}
              className="pushable rounded-3xl  bg-blue-400 hover:bg-blue-700 hover:text-blue-500 transform-cpu"
            >
              <span className="front bg-gray-400 px-4 py-2  rounded-3xl font-semibold">
                Contact
              </span>
            </button>
            <button
              onClick={() => {
                navigator("/apply-loan");
              }}
              className="pushable rounded-3xl bg-red-600   hover:bg-red-900  "
            >
              <span className="front bg-blue-600 hover:bg-blue-700 px-4 py-2  rounded-3xl font-semibold">
                Apply
              </span>
            </button>
          </div>
        </div>
      </span>
    );
  }
  const imgs = ["/slider2.jpg", "/slider3.jpg", "/slider1.jpg"];
  function ItemBox({ src }) {
    return (
      <div className="relative">
        <img
          src={src}
          alt={src}
          className={classNames(
            "w-full md:aspect-auto object-cover",
            `md:h-[600px] h-[300px]`
          )}
        />
        <ApplyBox />
      </div>
    );
  }

  return (
    <Carousel
      autoPlay={true}
      infiniteLoop
      showStatus={false}
      showArrows={false}
      showThumbs={false}
      className="productCarousel"
    >
      {imgs?.map((i, idx) => (
        <ItemBox key={idx} src={i} />
      ))}
    </Carousel>
  );
}

export default CarouselBanner;
