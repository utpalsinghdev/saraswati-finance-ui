import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import LinkButton from "../ui/link";
import { classNames } from "../../utils/classname";
function CarouselBanner({ height = "96" }) {
  const dynamicHeightClass = `md:h-${height}`;
  console.log(dynamicHeightClass);
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop
      showStatus={false}
      showArrows={false}
      showThumbs={false}
      className="productCarousel"
    >
      <div className="relative">
        <img
          src={"/banner1.webp"}
          alt={"banner 1"}
          className={classNames(
            "w-full md:aspect-auto object-cover",
            `h-[300px] `,
            dynamicHeightClass
          )}
        />
        <span className="absolute top-16 md:top-32 left-10 md:left-48 z-50 md:w-[400px] w-64  rounded-lg md:h-48 h-44 bg-black/60 text-white">
          <div className="p-4 flex flex-col items-start gap-4 justify-start">
            <p className="md:text-2xl text-xl text-left font-bold">
              Green Apple Financial Services PVT. LTD.
            </p>
            <p className="text-sm md:text-base  text-left">
              Get Your loan on an easy EMI bais.
            </p>

            <LinkButton to="/apply-loan" size={"NORMAL"}>
              Apply Now
            </LinkButton>
          </div>
        </span>
      </div>

      <div className="relative">
        <img
          src={"/banner2.webp"}
          alt={"banner 1"}
          className={classNames(
            "w-full md:aspect-auto object-cover",
            `h-[300px] `,
            dynamicHeightClass
          )}
        />
        <span className="absolute top-16 md:top-32 left-10 md:left-48 z-50 md:w-[400px] w-64  rounded-lg md:h-48 h-44 bg-black/60 text-white">
          <div className="p-4 flex flex-col items-start gap-4 justify-start">
            <p className="md:text-2xl text-xl text-left font-bold">
              Green Apple Financial Services PVT. LTD.
            </p>
            <p className="text-sm md:text-base  text-left">
              Get Your loan on an easy EMI bais.
            </p>

            <LinkButton to="/apply-loan" size={"NORMAL"}>
              Apply Now
            </LinkButton>
          </div>
        </span>
      </div>
      <div className="relative">
        <img
          src={"/banner3.webp"}
          alt={"banner 1"}
          className={classNames(
            "w-full md:aspect-auto object-cover",
            `h-[300px] `,
            dynamicHeightClass
          )}
        />
        <span className="absolute top-16 md:top-32 left-10 md:left-48 z-50 md:w-[400px] w-64  rounded-lg md:h-48 h-44 bg-black/60 text-white">
          <div className="p-4 flex flex-col items-start gap-4 justify-start">
            <p className="md:text-2xl text-xl text-left font-bold">
              Green Apple Financial Services PVT. LTD.
            </p>
            <p className="text-sm md:text-base  text-left">
              Get Your loan on an easy EMI bais.
            </p>

            <LinkButton to="/apply-loan" size={"NORMAL"}>
              Apply Now
            </LinkButton>
          </div>
        </span>
      </div>
    </Carousel>
  );
}

export default CarouselBanner;
