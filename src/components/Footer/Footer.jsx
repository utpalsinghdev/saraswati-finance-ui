import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
function Footer() {
  return (
    <div className="w-full bg-slate-950 ">
      <div className="container flex  mx-auto w-[90%] justify-between py-20 ">
        <div className="w-[25%]">
          <img src="/logo.png" className="w-44" alt="" />
          <p className="text-white mt-2">
            Green Apple Financial Services Private Limited. is dealing in
            Personal Loan, Loan against Property, Project Loan & Gold Loan. We
            Believe in fair dealing and prompt disbursement of founds on
            priority Basis.
          </p>
        </div>
        <div className="flex flex-col w-[20%]">
          <h1 className="text-white text-2xl font-bold">Quick Links</h1>
          <ul className="text-white flex flex-col gap-4 mt-4">
            <li className="flex flex-row items-center gap-2">
              <IoIosArrowForward /> Home
            </li>
            <li className="flex flex-row items-center gap-2">
              <IoIosArrowForward />
              About Us
            </li>
            <li className="flex flex-row items-center gap-2">
              <IoIosArrowForward />
              Services
            </li>
            <li className="flex flex-row items-center gap-2">
              <IoIosArrowForward />
              Apply Now
            </li>
            <li className="flex flex-row items-center gap-2">
              <IoIosArrowForward />
              Contact Us
            </li>
          </ul>
        </div>
        <div className="flex flex-col w-[20%]">
          <h1 className="text-white text-2xl font-bold">Contact Us</h1>
          <ul className="text-white flex flex-col gap-4 mt-4">
            <li className="flex flex-row items-center gap-2">
              <BsTelephone /> 9540542271
            </li>
            <li className="flex flex-row items-center gap-2">
              <BsTelephone /> Whatsapp
            </li>
            <li className="flex flex-row items-center gap-2">
              <AiOutlineMail />
              info@greenapplefinancial.com
            </li>
            <li className="flex flex-row items-start gap-2">
              <HiOutlineLocationMarker size={40} />
              <span>
                Plot number 70, Godrej Eternia, Level 4 Tower-A, Industrial Area
                Phase 1, Chandigarh, 160002
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
