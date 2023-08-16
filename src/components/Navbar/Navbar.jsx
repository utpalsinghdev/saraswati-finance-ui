import React, { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";
import { classNames } from "../../utils/classname";
import ContainerWrapper from "../ui/containtWrapper";
import { Phone } from "lucide-react";
const Navbar = () => {
  const location = useLocation();

  const isActive = (url) => {
    return location.pathname.split("/")[1] === url.split("/")[1];
  };
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(false);
  }, [location.pathname]);
  const links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About Us",
      link: "/about-us",
    },
    {
      name: "Loan Services",
      link: "/services/loan",
    },
    {
      name: "FAQs",
      link: "/faqs",
    },
    {
      name: "Contact Us",
      link: "/contact-us",
    },
  ];
  return (
    <div className="container w-full md:w-[90%] mx-auto">
      <div className="items-center justify-between px-2 flex">
        <img
          src="/logo.png"
          className=" block md:hidden  w-32 md:w-32 mt-1  text-2xl font-extrabold font-serif cursor-pointer "
        />
        <span className="block md:hidden flex flex-col items-center text-sm text-gray-800 gap-2 font-bold">
          <span className="flex items-center gap-2 ">
            <Phone className="w-4 text-green-600" /> 9540542272
          </span>
          <span className="flex items-center gap-2 " >
            <Phone className="w-4 text-green-600" />9540542271</span>
        </span>
      </div>
      <div className="relative mt-2 md:mt-6 pb-4  bg-indigo-500 md:bg-white  md:px-0 transition duration-300">
        <nav className="relative flex items-center justify-start md:justify-between">
          <img
            src="/logo.png"
            className="hidden md:block absolute w-28 md:w-32  -top-4 text-2xl font-extrabold font-serif cursor-pointer transition duration-300 hover:text-primary-500"
          />
          <div className="hidden md:flex items-center justify-end w-full  gap-4">
            <div className=" flex items-center  justify-between gap-4 font-normal ">
              {links.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.link}
                  className={classNames(
                    "cursor-pointer font-medium pb-1 border-b-2 transition duration-300  py-1 px-2 rounded-md border-white hover:text-gray-700 hover:border-b-2 tracking-wide  hover:border-primary-500 ",
                    isActive(link.link) ? "bg-green-200" : ""
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <Bars3Icon
            onClick={() => {
              setShow(!show);
            }}
            className="md:hidden mt-4 cursor-pointer w-6 h-6 ml-1"
          />
          <span className="md:hidden mt-4 ml-4 font-medium  text-md">
            Green Apple Financial Services Pvt Ltd.
          </span>
        </nav>
        <div
          style={{
            display: show ? "block" : "none",
          }}
          className="absolute z-50 bg-indigo-500 top-10 rounded-b-md right-0 w-full transition duration-300"
        >
          <div className="bg-white mt-4 w-full py-4 px-2 flex flex-col items-center  gap-1 font-semibold md:hidden">
            {links.map((link, idx) => (
              <Link
                key={idx}
                to={link.link}
                onClick={() => {
                  setShow(!show);
                }}
                className={classNames(
                  "px-2 py-2 w-full rounded-md border  cursor-pointer font-medium pb-1 border-b-2 transition duration-300  hover:text-primary-500 hover:border-b-2 tracking-wide  hover:border-primary-500",
                  isActive(link.link) ? "bg-green-200" : ""
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
