import React from "react";
import ContainerWrapper from "../components/ui/containtWrapper";
import HeadingWrapper from "../components/ui/heading Wrapper";
import CarouselBanner from "../components/CarouselBanner";
import Image from "../components/ui/Image/Index";
import AccordianGroup from "../components/ui/accordian/AccordianGroup";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiSolidChevronsRight } from "react-icons/bi";
import Contact from "../components/contact";

function About() {
  const loanInformation = [
    "Personal/Educational loans are offered up to 50 Lakhs.",
    "Special schemes for Government, Private sectors employee, Engineers, Teacher, Architectures, other persons for grow their business.",
    "Easy EMI options means mode of payment and time.",
    "You can get personal/educational loan at 4 to 9% flat p.a rate of interest.",
    "A person can get a personal loan which have minimum six thousand salary.",
    "Maximum loan repayment time is 20 years.",
    "One must have a creditors proof stating about a steady job, including past Paychecks.",
    "Needs a Guarantor to get all type of loan.",
    "Bad Civil score doesn't matter for any type of loan.",
    "If your file has been rejected by bank you can apply in our company.",
  ];
  return (
    <div className="">
      <ContainerWrapper>
        <div className="w-full flex flex-col md:flex-row justify-between mb-10">
          <div className="px-4 py-8 mt-5 md:mt-20 w-full md:w-[60%]">
            <h1 className="flex gap-2 items-center text-left md:text-center  ">
              <span className="text-3xl font-bold text-green-500">About</span>
              <span className="text-3xl font-bold text-blue-800">
                Caslon Business Services Private Limited
              </span>
            </h1>
            <p className="text-md text-gray-700 font-medium mt-8">
              Caslon Business Services Pvt. ltd. is dealing in Home Loan,
              Personal Loan, Agriculture Loan, Shop Loan, Flat Loan, Project
              Loan, Education Loan, Pay Slip Loan, Car Loan, Machine Loan,
              Business Loans, Loan Against Property & Project Etc.
            </p>
            <div className="upper bg-green-500 rounded-2xl mt-8">
              <div className="lower bg-blue-800 rounded-2xl mr-1 pt-1 pb-4">
                <h1 className="pl-4 text-2xl font-extrabold text-green-600 flex items-center gap-2 border-b border-blue-900 mx-2">
                  <AiFillInfoCircle /> Important Information
                </h1>
                <div className="text-gray-200 text-sm font-medium px-4 flex items-start flex-col gap-2">
                  {loanInformation.map((l) => (
                    <p key={l} className="flex gap-2 items-center">
                      <BiSolidChevronsRight className="text-green-500 text-lg" />
                      {l}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <Image src={"/about.jpg"} />
            <Contact />
          </div>
        </div>
      </ContainerWrapper>
    </div>
  );
}

export default About;
