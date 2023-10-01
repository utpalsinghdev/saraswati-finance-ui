import React from "react";
import ContainerWrapper from "../components/ui/containtWrapper";
import HeadingWrapper from "../components/ui/heading Wrapper";
import CarouselBanner from "../components/CarouselBanner";
import Image from "../components/ui/Image/Index";
import AccordianGroup from "../components/ui/accordian/AccordianGroup";

function About() {
  return (
    <div className="bg-gray-100">
      <CarouselBanner height="96" />
      <ContainerWrapper>
        <HeadingWrapper
          heading="About"
          title="Green Apple Financial Services Private Limited."
        >
          <div className="w-full bg-gray-100">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 px-2 py-20 md:py-15">
              <div className=" h-[500px]">
                <Image
                  className=" h-[500px] md:w-[500px]  md:aspect-auto object-cover rounded-md"
                  src={"/about.webp"}
                  alt="about-section"
                />
              </div>

              <div className="flex flex-col text-left px-0 md:px-0 gap-6 ">
                <span className="W-full text-2xl  text-left font-medium text-green-600 text-primary-500">
                  About Us
                </span>
                <h1 className="text-4xl lg:text-3xl text-indigo-500 font-bold md:text-left ">
                  Green Apple Financial Services PVT. LTD.
                </h1>
                <p className="text-gray-700 text-sm font-medium md:text-left ">
                  Green Apple Financial Services Private Limited is dealing in
                  Personal Loan, Loan against Property, Project Loan & Gold
                  Loan. We Believe in fair dealing and prompt disbursement of
                  founds on priority Basis.
                </p>
                <span className="text-gray-700 text-sm font-semibold md:text-left ">
                  Green Apple Financial Services Pvt Ltd is an organization that
                  motivates people to fulfill their dreams, which otherwise
                  would be difficult to achieve due to the inaccessibility to
                  right financial consulting and solutions.
                </span>
                <span className="text-gray-900 text-lg font-semibold md:text-left ">
                  We are registered Private Limited Company:
                </span>
                <span className="text-gray-500 text-lg font-semibold md:text-left ">
                  IN CORPORATION NO: U69202HR2023PTC112412
                </span>
                <span className="text-gray-500 text-lg font-semibold md:text-left ">
                  PAN NO: AAKCG5265C
                </span>
                <span className="text-gray-500 text-lg font-semibold md:text-left ">
                  TAN NO: RTKG17932F
                </span>
              </div>
            </section>
          </div>
        </HeadingWrapper>
      </ContainerWrapper>
    </div>
  );
}

export default About;
