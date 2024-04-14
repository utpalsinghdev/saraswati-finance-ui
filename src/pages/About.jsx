import React from "react";
import ContainerWrapper from "../components/ui/containtWrapper";
import HeadingWrapper from "../components/ui/heading Wrapper";
import CarouselBanner from "../components/CarouselBanner";
import Image from "../components/ui/Image/Index";
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
      <div className="container w-ful md:w-[90%] mx-auto px-1">
        <div className="w-full flex flex-col md:flex-row justify-between mb-10">
          <div className="px-1 py-8 mt-5 md:mt-20 w-full md:w-[60%]">
            <h1 className="flex gap-2 items-center flex-col md:flex-row text-left md:text-center  ">
              <span className="text-3xl w-full md:w-max font-bold text-red-500">
                About
              </span>
              <span className="text-3xl font-bold text-old-brick-800">
                Fundwisor Finance Business Solution Pvt. Ltd.
              </span>
            </h1>
            <p className="text-md text-old-brick-500 font-medium mt-8">
              Fundwisor Finance Business Solution Pvt. Ltd. is dealing in Home
              Loan, Personal Loan, Agriculture Loan, Shop Loan, Flat Loan,
              Project Loan, Education Loan, Pay Slip Loan, Car Loan, Machine
              Loan, Business Loans, Loan Against Property & Project Etc.
            </p>
            <div className="upper bg-red-500 rounded-2xl mt-8">
              <div className="lower bg-old-brick-800 rounded-2xl mr-1 pt-1 pb-4">
                <h1 className="pl-4 text-2xl font-extrabold text-red-600 flex items-center gap-2 border-b border-old-brick-900 mx-2">
                  <AiFillInfoCircle /> Important Information
                </h1>
                <div className="text-white text-sm font-medium px-4 flex items-start flex-col gap-2">
                  {loanInformation?.map((l) => (
                    <p key={l} className="flex gap-2 items-center">
                      <div className="flex items-center gap-2">
                        <span className="self-start">
                          {" "}
                          <BiSolidChevronsRight className="text-white text-lg mt-1 md:mt-0" />
                        </span>
                        <p>{l}</p>
                      </div>
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
      </div>
    </div>
  );
}

export default About;
