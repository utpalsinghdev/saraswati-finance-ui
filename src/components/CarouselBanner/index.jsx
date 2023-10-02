import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import LinkButton from "../ui/link";
import { classNames } from "../../utils/classname";
import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();
function CarouselBanner() {
  function ApplyBox() {
    return (
      <span className="absolute top-16 md:top-20 left-6 md:left-40 z-50 md:w-[500px] w-72  rounded-lg md:h-56 h-52 bg-white/30 ">
        <div className="p-4 flex flex-col items-start gap-4 justify-start">
          <p className="md:text-5xl text-3xl text-left text-blue-800 font-extrabold">
            <p> vandhnam Finance</p>
            <p className="text-orange-500 md:mt-4 mt-1"> PVT. LTD.</p>
          </p>

          <div className="flex md:mt-4 mt-1 items-center gap-4">
            <button className="pushable rounded-3xl  bg-orange-400 hover:bg-orange-700 hover:text-orange-500 transform-cpu">
              <span className="front bg-gray-400 px-4 py-2  rounded-3xl font-semibold">
                Contact
              </span>
            </button>
            <button className="pushable rounded-3xl bg-blue-600   hover:bg-blue-900  ">
              <span className="front bg-orange-600 hover:bg-orange-700 px-4 py-2  rounded-3xl font-semibold">
                Apply
              </span>
            </button>
          </div>
        </div>
      </span>
    );
  }
  const imgs = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"];
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
      {imgs.map((i, idx) => (
        <ItemBox key={idx} src={i} />
      ))}
    </Carousel>
  );
}

export default CarouselBanner;
