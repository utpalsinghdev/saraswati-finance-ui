import React from "react";
import { Link } from "react-router-dom";
import ContainerWrapper from "../ui/containtWrapper";

function PreNavbar() {
  return (
    <div className=" w-full bg-blue-800/95 py-2 z-40">
      <ContainerWrapper>
        <div className="flex justify-between items-center text-white">
          <div className="py-2 hidden md:block">
            Call Us: <a href="tel:9540542272">9540542272</a>
          </div>
          <div className="flex flex-row gap-2  md:gap-2 items-center justify-start flex-wrap">
            <Link
              className="py-0.5 px-1 md:px-4  border border-white text-xs md:text-sm"
              to="/"
            >
              Apply Loan
            </Link>
            <Link
              className="py-0.5 px-1 md:px-4  border border-white text-xs md:text-sm"
              to="/"
            >
              Career
            </Link>
            <Link
              className="py-0.5 px-1 md:px-4  border border-white text-xs md:text-sm"
              to="/loan-calculator"
            >
              Calculator
            </Link>
            <Link
              className="py-0.5 px-1 md:px-4  border border-white text-xs md:text-sm"
              to="/"
            >
              Agent App
            </Link>
            <Link
              className="py-0.5 px-1 md:px-4  border border-white text-xs md:text-sm"
              to="/"
            >
              Terms & Conditions
            </Link>
            <Link
              className="py-0.5 px-1 md:px-4  border border-white text-xs md:text-sm"
              to="/"
            >
              Anti-fraud Policy
            </Link>
          </div>
        </div>
      </ContainerWrapper>
    </div>
  );
}

export default PreNavbar;
