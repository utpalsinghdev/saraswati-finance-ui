import React from "react";
import HeadingWrapper from "../components/ui/heading Wrapper";
import ContainerWrapper from "../components/ui/containtWrapper";
import CarouselBanner from "../components/CarouselBanner";
import { ChevronLast, ChevronLeft } from "lucide-react";

const TermAndCondition = () => {
  return (
    <div className="bg-gray-100">
      <CarouselBanner />
      <ContainerWrapper>
        <HeadingWrapper
          heading={"Terms & Conditions"}
          title={"Aardhya Financial Pvt. ltd."}
        >
          <div className="px-4 mt-4  pb-8 flex flex-col gap-8 ">
            <p className="text-gray-600 text-sm font-medium h-full w-full flex items-center justify-start gap-4">
              <ChevronLeft className="text-green-600 w-4 h-4 rotate-180" />{" "}
              <span className="w-[95%]">
                Personal/Educational loans are offered up to 50 Lakhs.
              </span>
            </p>

            <p className="text-gray-600 text-sm font-medium h-full w-full flex items-center justify-start gap-4">
              <ChevronLeft className="text-green-600 w-4 h-4 rotate-180" />
              <span className="w-[95%]">
                Special schemes for Government, Private sectors employee,
                Engineers, Teacher, Architectures, other persons for grow their
                business.
              </span>
            </p>

            <p className="text-gray-600 text-sm font-medium h-full w-full flex items-center justify-start gap-4">
              <ChevronLeft className="text-green-600 w-4 h-4 rotate-180" />{" "}
              <span className="w-[95%]">
                {" "}
                Easy EMI options means mode of payment and time.
              </span>
            </p>
            <p className="text-gray-600 text-sm font-medium h-full w-full flex items-center justify-start gap-4">
              <ChevronLeft className="text-green-600 w-4 h-4 rotate-180" />{" "}
              <span className="w-[95%]">
                {" "}
                You can get personal/educational loan at 4 to 9% flat p.a rate
                of interest.
              </span>
            </p>
            <p className="text-gray-600 text-sm font-medium h-full w-full flex items-center justify-start gap-4">
              <ChevronLeft className="text-green-600 w-4 h-4 rotate-180" />
              <span className="w-[95%]">
                A person can get a personal loan which have minimum six thousand
                salary.{" "}
              </span>
            </p>
            <p className="text-gray-600 text-sm font-medium h-full w-full flex items-center justify-start gap-4">
              <ChevronLeft className="text-green-600 w-4 rotate-180 " />
              <span className="w-[95%]">
                {" "}
                Maximum loan repayment time is 20 years.{" "}
              </span>
            </p>
            <p className="text-gray-600 text-sm font-medium h-full w-full flex items-center justify-start gap-4">
              <ChevronLeft className="text-green-600 w-4 h-4 rotate-180" />
              <span className="w-[95%]">
                {" "}
                One must have a creditors proof stating about a steady job,
                including past Paychecks.
              </span>
            </p>
            <p className="text-gray-600 text-sm font-medium h-full w-full flex items-center justify-start gap-4">
              <ChevronLeft className="text-green-600 w-4 h-4 rotate-180" />{" "}
              <span className="w-[95%]">
                Needs a Guarantor to get all type of loan
              </span>
            </p>
            <p className="text-gray-600 text-sm font-medium h-full w-full flex items-center justify-start gap-4">
              <ChevronLeft className="text-green-600 w-4 h-4 rotate-180" />{" "}
              <span className="w-[95%]">
                Bad Civil score doesn&apos;t matter for any type of loan
              </span>
            </p>
            <p className="text-gray-600 text-sm font-medium h-full w-full flex items-center justify-start gap-4">
              <ChevronLeft className="text-green-600 w-4 h-4 rotate-180" />
              <span className="w-[95%]">
                {" "}
                If your file has been rejected by bank you can apply in our
                company
              </span>
            </p>
          </div>
        </HeadingWrapper>
      </ContainerWrapper>
    </div>
  );
};

export default TermAndCondition;
