import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import ContainerWrapper from "../ui/containtWrapper";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="w-full bg-slate-950 ">
      <ContainerWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 justify-between py-20 ">
          <div className="w-full">
            <img src="/logo.png" className="w-44" alt="" />
            <p className="text-white mt-2">
              Green Apple Financial Services Private Limited. is dealing in
              Personal Loan, Loan against Property, Project Loan & Gold Loan. We
              Believe in fair dealing and prompt disbursement of founds on
              priority Basis.
            </p>
          </div>
          <div className="w-full ">
            <h1 className="text-white text-2xl font-bold">Quick Links</h1>
            <ul className="text-white flex flex-col gap-4 mt-4">
              <Link to="/" className="flex flex-row items-center gap-2">
                <IoIosArrowForward /> Home
              </Link>
              <Link to="about-us" className="flex flex-row items-center gap-2">
                <IoIosArrowForward />
                About Us
              </Link>
              <li className="flex flex-row items-center gap-2">
                <IoIosArrowForward />
                Services
              </li>
              <li className="flex flex-row items-center gap-2">
                <IoIosArrowForward />
                Apply Now
              </li>
              <Link to="contact-us" className="flex flex-row items-center gap-2">
                <IoIosArrowForward />
                Contact Us
              </Link>
            </ul>
          </div>
          <div className="w-full ">
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
                  Plot number 70, Godrej Eternia, Level 4 Tower-A, Industrial
                  Area Phase 1, Chandigarh, 160002
                </span>
              </li>
            </ul>
          </div>
        </div>
      </ContainerWrapper>
    </div>
  );
}

export default Footer;
