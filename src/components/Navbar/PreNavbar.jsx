import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import ContainerWrapper from "../ui/containtWrapper";

function PreNavbar() {
  const location = useLocation();
  const myRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, myRef.current.offsetTop);
  }, [location.pathname]);
  return (
    <div ref={myRef} className=" w-full bg-blue-800/95 py-2 z-40">
      <ContainerWrapper>
        <div className="flex justify-between items-center text-white">
          <div className="py-2 hidden md:block">
            Call Us: <a href="tel:9540542272">9540542272</a>
          </div>
          <div className="flex flex-row gap-2  md:gap-2 items-center justify-start flex-wrap">
            <Link
              className="py-0.5 px-1 md:px-4  border border-white text-xs md:text-sm"
              to="/apply-loan"
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
              to="/"
            >
              login
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
              to="/terms-and-conditions"
            >
              Terms & Conditions
            </Link>
            <Link
              className="py-0.5 px-1 md:px-4  border border-white text-xs md:text-sm"
              to="/anti-fraud-policy"
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
