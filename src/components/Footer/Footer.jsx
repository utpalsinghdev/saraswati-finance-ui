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
            <img src="/logo_full.png" className="w-64" alt="" />
            <p className="text-white mt-2">
              Aaradhya Financial Private Limited. is dealing in Personal Loan,
              Loan against Property, Project Loan & Gold Loan. We Believe in
              fair dealing and prompt disbursement of founds on priority Basis.
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
              {/* <a href="/broc.pdf" className="flex flex-row items-center gap-2">
                <IoIosArrowForward />
                Download Brochure
              </a> */}
            </ul>
          </div>
          <div className="w-full ">
            <h1 className="text-white text-2xl font-bold">Contact Us</h1>
            <ul className="text-white flex flex-col gap-4 mt-4">
              <li className="flex flex-row items-center gap-2">
                <BsTelephone />{" "}
                <a href="tel:8755030228" target="_blank" rel="noreferrer">
                  8755030228
                </a>
              </li>
              <li className="flex flex-row items-center gap-2">
                <BsTelephone />{" "}
                <a href="tel:8755030228" target="_blank" rel="noreferrer">
                  8755030228
                </a>
              </li>

              <li className="flex flex-row items-center gap-2">
                <AiOutlineMail />
                <a
                  href="mailto:info@Aaradhyafinance.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  info@Aaradhyafinance.com
                </a>
              </li>
              <li className="flex flex-row items-start gap-2">
                <span>
                  <HiOutlineLocationMarker size={20} />
                </span>
                <span>
                  {" "}
                  Corporate Office: Office no 401 fourth floor plot no 86, near
                  Sai Mandir, Laxmi Nagar, Delhi head office.
                </span>
              </li>
              <li className="flex flex-row items-start gap-2">
                <span>
                  <HiOutlineLocationMarker size={20} />
                </span>
                <span>
                  {" "}
                  Head Office: 9th foor, core tower, near prinam crossing
                  ellisbridge Ahmedabad-6, Ahmedabad GJ.
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
