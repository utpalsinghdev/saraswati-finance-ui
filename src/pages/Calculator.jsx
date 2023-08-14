import React from "react";
import HeadingWrapper from "../components/ui/heading Wrapper";
import CarouselBanner from "../components/CarouselBanner";
import ContainerWrapper from "../components/ui/containtWrapper";
import Image from "../components/ui/Image/Index";
import Input from "../components/ui/input";
import { BiRupee } from "react-icons/bi";
import Button from "../components/ui/button";
import Select from "../components/ui/select";
import { AiOutlineCalendar } from "react-icons/ai";

function Calculator() {
  return (
    <div className="bg-gray-100">
      <CarouselBanner height="350px" />
      <ContainerWrapper>
        <HeadingWrapper
          heading="Loan Calculator"
          title="Green Apple Financial Services Private Limited."
        >
          <div className="px-0 md:px-16 grid grid-cols-1 gap-4 md:grid-cols-2 mt-4 md:mt-8">
            <Image
              src={"https://ukfinservice.com/assets/images/calculator.jpg"}
              className={
                " h-[500px] md:w-[500px]  md:aspect-auto object-cover rounded-md"
              }
            />
            <div className="flex flex-col text-left ">
              <span className="W-full text-2xl  text-left font-medium text-white bg-indigo-800 rounded-t-md px-8 py-4 ">
                Loan Calculator
              </span>
              <div className="w-full pt-4 rounded-b-md pb-8  h-full flex flex-col gap-4 px-4 bg-white">
                <Input
                  label={"Enter Loan Amount"}
                  type="number"
                  name="Amount"
                  placeholder={"Enter Amount"}
                  icon={<BiRupee className="text-indigo-600" />}
                />
                <Select
                  icon={<AiOutlineCalendar className="text-indigo-600" />}
                  label={"Select Loan Tenure"}
                  name="year"
                >
                  <option value="null">Select a year</option>
                  <option value="1">1 Year</option>
                </Select>
                <Button size={"NORMAL"}>Calculate</Button>
              </div>
            </div>
          </div>
        </HeadingWrapper>
      </ContainerWrapper>
    </div>
  );
}

export default Calculator;
