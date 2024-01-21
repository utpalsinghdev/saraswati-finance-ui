import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import ContainerWrapper from "../ui/containtWrapper";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="w-full bg-gradient-to-r from-cyan-500 to-blue-900 ">
      <ContainerWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 justify-between py-20 ">
          <div className="w-full">
            <img src="/logo_full.png" className="w-72" alt="" />
            <p className="text-white mt-2">
              Captial Group Business Solution Private Limited. is dealing in
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
              <Link
                to="/services/loan"
                className="flex flex-row items-center gap-2"
              >
                <IoIosArrowForward />
                Services
              </Link>
              <a href="/Agent.apk" className="flex flex-row items-center gap-2">
                <IoIosArrowForward />
                Agent App
              </a>
              <Link
                to="apply-loan"
                className="flex flex-row items-center gap-2"
              >
                <IoIosArrowForward />
                Apply Now
              </Link>
              <Link
                to="contact-us"
                className="flex flex-row items-center gap-2"
              >
                <IoIosArrowForward />
                Contact Us
              </Link>
            </ul>
          </div>
          <div className="w-full ">
            <h1 className="text-white text-2xl font-bold">Contact Us</h1>
            <ul className="text-white flex flex-col gap-4 mt-4">
              <li className="flex flex-row items-center gap-2">
                <BsTelephone />{" "}
                <a href="tel:8477908496" target="_blank" rel="noreferrer">
                  8477908496
                </a>
              </li>
              <li className="flex flex-row items-center gap-2">
                <BsTelephone />{" "}
                <a href="tel:8477908496" target="_blank" rel="noreferrer">
                  8477908496
                </a>
              </li>

              <li className="flex flex-row items-center gap-2">
                <AiOutlineMail />
                <a
                  href="mailto:info@capitalgbs.in"
                  target="_blank"
                  rel="noreferrer"
                >
                  info@capitalgbs.in
                </a>
              </li>
              {/* <li className="flex flex-row items-start gap-2">
                <span>
                  <HiOutlineLocationMarker size={20} />
                </span>
                <span>
                  {" "}
                  Branch Office: Plot No.330, Bus stand Rd, Opp. Acharya Puri,
                  Prem Nagar, Sector 12, Gurugram, Haryana 122001
                </span>
              </li> */}
              <li className="flex flex-row items-start gap-2">
                <span>
                  <HiOutlineLocationMarker size={20} />
                </span>
                <span>
                  {" "}
                  Office No : 410-415 1st Floor Helios Business Park Outer Ring
                  Road Bangalore Pincode - 560103
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
