import React from "react";
import Button from "../components/ui/button";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Ticker from "../components/ui/ticker";
import Image from "../components/ui/Image/Index";
const Homepage = () => {
  return (
    <div className="w-full  flex items-center justify-center flex-col">
      <div className="relative text-white text-[20px] w-full  mx-auto">
        <Carousel
          autoPlay={true}
          infiniteLoop
          showStatus={false}
          showArrows={false}
          showThumbs={false}
          className="productCarousel"
        >
          <div className="relative">
            <Image
              src={"/banner1.jpg"}
              alt={"banner 1"}
              className="w-full h-[500px] md:aspect-auto object-cover"
            />
            <span className="absolute top-36 left-48 z-50 w-[400px] rounded-lg h-48 bg-black/60 text-white">
              <div className="p-4 flex flex-col items-start gap-4 justify-start">
                <p className="text-2xl text-left font-bold">
                  Green Apple Financial Services PVT. LTD.
                </p>
                <p className="text-base">Get Your loan on an easy EMI bais.</p>

                <Button size={"NORMAL"}>Apply Now</Button>
              </div>
            </span>
          </div>

          <div className="relative">
            <Image
              src={"/banner2.jpg"}
              alt={"banner 1"}
              className="w-full h-[500px] md:aspect-auto object-cover"
            />
            <span className="absolute top-36 left-48 z-50 w-[400px] rounded-lg h-48 bg-black/60 text-white">
              <div className="p-4 flex flex-col items-start gap-4 justify-start">
                <p className="text-2xl text-left font-bold">
                  Green Apple Financial Services PVT. LTD.
                </p>
                <p className="text-base">Get Your loan on an easy EMI bais.</p>

                <Button size={"NORMAL"}>Apply Now</Button>
              </div>
            </span>
          </div>
          <div className="relative">
            <Image
              src={"/banner3.jpg"}
              alt={"banner 1"}
              className="w-full h-[500px] md:aspect-auto object-cover"
            />
            <span className="absolute top-36 left-48 z-50 w-[400px] rounded-lg h-48 bg-black/60 text-white">
              <div className="p-4 flex flex-col items-start gap-4 justify-start">
                <p className="text-2xl text-left font-bold">
                  Green Apple Financial Services PVT. LTD.
                </p>
                <p className="text-base">Get Your loan on an easy EMI bais.</p>

                <Button size={"NORMAL"}>Apply Now</Button>
              </div>
            </span>
          </div>
        </Carousel>
        <div className="absolute container mx-auto w-[80%] z-50 left-1/2 transform -translate-x-1/2 overflow-hidden -bottom-14 text-black bg-white  flex h-max  gap-2 ">
          <div className="bg-green-200 w-4">
            <p className="text-green-200">d</p>
          </div>

          <div className="flex flex-col py-2 z-50 ">
            <span className="py-1 px-2 text-black text-sm font-medium ">
              ABOUT COMPANY
            </span>
            <span className="py-1 px-2 text-2xl font-semibold ">News</span>
          </div>
          <div className="flex flex-col justify-between w-full py-2">
            <span className="py-1 px-2 text-sm  ">
              <Ticker>
                CALL FOR ANY TYPE OF LOAN ON: 9540542272 IN CORPORATION NO:
                -Green Apple Financial Services PAN NO: - Green Apple Financial
                Services Private Limited TAN: - Green Apple Financial Services
                Private Limited.
              </Ticker>
            </span>
            <span className="py-1 px-2 text-sm">
              <Ticker>
                WELCOME TO Green Apple Financial Services Private Limited. LTD.
                TO CHECK ELIGIBILITY PLEASE CALL US ON OUR HELPLINE NUMBER.
              </Ticker>
            </span>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-100">
        <section className="container  w-[90%] mx-auto flex md:flex-row flex-col gap-12 md:gap-6 px-2 items-center justify-between py-20 md:py-15">
          <div className="max-w-[500px] min-w-[500px] h-[500px]">
            <Image
              className="w-[500px] h-[500px] md:aspect-auto object-cover rounded-md"
              src={"/about.jpg"}
              alt="about-section"
            />
          </div>

          <div className="flex flex-col text-left  px-8 md:px-0 gap-6 ">
            <span className="W-full text-2xl  text-left font-medium text-green-600 text-primary-500">
              About Us
            </span>
            <h1 className="text-4xl lg:text-3xl text-indigo-500 font-bold md:text-left ">
              Green Apple Financial Service PVT. LTD.
            </h1>
            <p className="text-gray-700 text-sm font-medium md:text-left text-center">
              Green Apple Financial Service Private Limited is dealing in
              Personal Loan, Loan against Property, Project Loan & Gold Loan. We
              Believe in fair dealing and prompt disbursement of founds on
              priority Basis.
            </p>
            <span className="text-gray-700 text-sm font-semibold md:text-left ">
              Green Apple Financial Service Pvt Ltd is an organization that
              motivates people to fulfill their dreams, which otherwise would be
              difficult to achieve due to the inaccessibility to right financial
              consulting and solutions.
            </span>
            <span className="text-gray-900 text-lg font-semibold md:text-left ">
              We are registerd Private Limited Company:
            </span>
            <span className="text-gray-500 text-lg font-semibold md:text-left ">
              IN CORPORATION NO:
            </span>
            <span className="text-gray-500 text-lg font-semibold md:text-left ">
              PAN NO:
            </span>
            <span className="text-gray-500 text-lg font-semibold md:text-left ">
              TAN NO:
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Homepage;
