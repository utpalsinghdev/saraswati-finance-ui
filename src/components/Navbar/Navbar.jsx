import React, { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";
import { classNames } from "../../utils/classname";
import ContainerWrapper from "../ui/containtWrapper";
const Navbar = () => {
  const location = useLocation();
  const isActive = (url) => {
    return location.pathname.split("/")[1] === url.split("/")[1];
  };
  const [show, setShow] = useState(false);
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
      link: "/loan-services",
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
    <ContainerWrapper>
      <div className="relative mt-6 pb-4 p-1   md:px-0 transition duration-300">
        <nav className="relative flex items-center justify-between">
          <img
            src="/logo.png"
            className="hidden md:block absolute w-28 md:w-32  -top-6 text-2xl font-extrabold font-serif cursor-pointer transition duration-300 hover:text-primary-500"
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
            className="md:hidden cursor-pointer w-6 h-6"
          />
             <img
            src="/logo.png"
            className=" block md:hidden absolute w-24 md:w-32  right-0 text-2xl font-extrabold font-serif cursor-pointer transition duration-300 hover:text-primary-500"
          />
        </nav>
        <div
          style={{
            display: show ? "block" : "none",
          }}
          className="absolute z-50 bg-white right-0 w-full transition duration-300"
        >
          <div className="bg-white mt-4 w-full py-4 flex flex-col items-center  gap-1 font-semibold md:hidden">
            {links.map((link, idx) => (
              <Link
                key={idx}
                to={link.link}
                onClick={() => {
                  setShow(!show);
                }}
                className={classNames(
                  "px-2 py-2 w-full rounded-md cursor-pointer font-medium pb-1 border-b-2 transition duration-300 border-white hover:text-primary-500 hover:border-b-2 tracking-wide  hover:border-primary-500",
                  isActive(link.link) ? "bg-green-200" : ""
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default Navbar;
