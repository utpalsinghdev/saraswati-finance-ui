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
import { Formik } from "formik";
import LinkButton from "../components/ui/link";

function Calculator() {
  function calculateEMI(principal, interestRate, years) {
    if (principal && interestRate && years) {
      interestRate = interestRate / 100;
      const monthlyInterestRate = interestRate / 12;
      const totalMonths = years * 12;
      const emi =
        (principal * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -totalMonths));
      const totalLoanAmount = emi * totalMonths;
      return {
        emi: Math.round(emi),
        totalLoanAmount: totalLoanAmount,
        totalMonths,
      };
    } else {
      return null;
    }
  }
  return (
    <div className="bg-gray-100">
      <CarouselBanner  />
      <ContainerWrapper>
        <HeadingWrapper
          heading="Loan Calculator"
          title="Green Apple Financial Services Private Limited."
        >
          <div className="px-0 md:px-16 grid grid-cols-1 gap-4 md:grid-cols-2 mt-4 md:mt-8">
            <Image
              src={"/calculator.jpg"}
              className={
                " h-[500px] md:w-[500px]  md:aspect-auto object-cover rounded-md"
              }
            />
            <div className="flex flex-col text-left ">
              <span className="W-full text-2xl  text-left font-medium text-white bg-indigo-800 rounded-t-md px-8 py-4 ">
                Loan Calculator
              </span>
              <div className="w-full pt-4 rounded-b-md pb-8  h-full flex flex-col gap-4 px-4 bg-white">
                <Formik
                  initialValues={{
                    amount: "",
                    years: "",
                    intrestRate: 5,
                  }}
                >
                  {(e) => (
                    <>
                      <Input
                        label={"Enter Loan Amount"}
                        type="number"
                        value={e.values.amount}
                        name="amount"
                        onChange={e.handleChange}
                        placeholder={"Enter Amount"}
                        icon={<BiRupee className="text-indigo-600" />}
                      />
                      <Select
                        icon={<AiOutlineCalendar className="text-indigo-600" />}
                        label={"Select Loan Tenure"}
                        value={e.values.years}
                        onChange={e.handleChange}
                        name="years"
                      >
                        <option value="null">Select a year</option>
                        {Array.from({ length: 17 }, (_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1} Year{index !== 0 ? "s" : ""}
                          </option>
                        ))}
                      </Select>

                      <p className="text-sm mt-8 font-medium text-center text-gray-700">
                        You have to pay
                        {calculateEMI(
                          Number(e.values.amount),
                          Number(e.values.intrestRate),
                          Number(e.values.years)
                        )?.emi && (
                          <>
                            <span className="text-green-600">
                              {" "}
                              Rs.{" "}
                              {
                                calculateEMI(
                                  Number(e.values.amount),
                                  Number(e.values.intrestRate),
                                  Number(e.values.years)
                                )?.emi
                              }
                              <span className="text-gray-700">
                                {" "}
                                / Month at the interest Rate of{" "}
                                <span className="text-green-600">
                                  5%
                                </span> for{" "}
                                <span className="text-indigo-600">
                                  {
                                    calculateEMI(
                                      Number(e.values.amount),
                                      Number(e.values.intrestRate),
                                      Number(e.values.years)
                                    )?.totalMonths
                                  }
                                </span>{" "}
                                Months
                              </span>
                            </span>
                          </>
                        )}
                      </p>
                      <div className="flex items-start justify-center mt-4 w-full">
                        <LinkButton to="/apply-loan" size={"NORMAL"}>Apply Now</LinkButton>
                      </div>
                    </>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </HeadingWrapper>
      </ContainerWrapper>
    </div>
  );
}

export default Calculator;
