import React from "react";
import { Link } from "react-router-dom";

function PreNavbar() {
  return (
    <div className=" w-full bg-blue-800/95 py-1 z-40">
      <div className="container w-[90%] mx-auto flex justify-between items-center text-white">
        <div className="py-2 hidden md:block">
          Call Us: <a href="tel:9540542272">9540542272</a>
        </div>
        <div className="flex flex-row gap-2 items-center justify-start ml-10 flex-wrap">
          <Link className="py-1 px-4 border border-white text-sm" to="/">
            Apply Loan
          </Link>
          <Link className="py-1 px-4 border border-white text-sm" to="/">
            Career
          </Link>
          <Link className="py-1 px-4 border border-white text-sm" to="/">
            Calculator
          </Link>
          <Link className="py-1 px-4 border border-white text-sm" to="/">
            Agent App
          </Link>
          <Link className="py-1 px-4 border border-white text-sm" to="/">
            Terms & Conditions
          </Link>
          <Link className="py-1 px-4 border border-white text-sm" to="/">
            Anti-fraud Policy
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PreNavbar;
