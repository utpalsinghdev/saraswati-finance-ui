import React, { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";
import { classNames } from "../../utils/classname";
import Brand from "../brand";
import Image from "../ui/Image/Index";
import { Headphones } from "lucide-react";
import metaData from "../../utils/lib/site.config";
const Navbar = () => {
  const location = useLocation();

  const isActive = (url) => {
    return location.pathname.split("/")[1] === url.split("/")[1];
  };
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(false);
  }, [location.pathname]);
  const [isMobiled, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth >= 710);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // console.log(isMobiled);
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
      name: "Agent Joining",
      link: "/Career",
    },
    {
      name: "Payment",
      link: "/pay",
    },
    {
      name: "Verify Agent",
      link: "/verify-agent",
    },

    {
      name: "Contact Us",
      link: "/contact-us",
    },
    {
      name: "Apply Now",
      link: "/apply-loan",
    },
    {
      name: "Customer Login",
      link: "/c/login",
    },
  ];
  return (
    <div className=" w-full md:w-[90%] mx-auto">
      <div
        className={classNames(
          "relative  md:mt-6     md:px-0 transition duration-300",
          "  md:bg-white",
          isMobiled ? "pb-4 " : "bg-white "
        )}
      >
        <nav className="relative flex items-center justify-start md:justify-between">
          <Link to="/">
            <Brand className={"hidden md:flex"} />
          </Link>
          <div className="hidden md:flex items-center justify-end w-full  gap-4">
            <div className=" flex items-center  justify-between gap-4 font-normal ">
              {links?.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.link}
                  className={classNames(
                    "cursor-pointer font-medium pb-1 border-b-2 transition duration-300  py-1 px-2 rounded-md border-white hover:text-gray-700 hover:border-b-2 tracking-wide  hover:border-primary-500 ",
                    isActive(link.link) ? "bg-red-100" : ""
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
            className="md:hidden mt-4 cursor-pointer  w-6 h-6 ml-4"
          />
          <span className="md:hidden mr-4 px-2 w-full flex items-center justify-between font-medium  text-md">
            <Image
              src="/logo.png"
              className=" block md:hidden  w-28 py-1  cursor-pointer"
            />
            <span
              className=" w-full 
            
              text-sm font-semibold text-xl
            "
            >
              <p className="text-center">ROSEDONE SECURE</p>
              <p className="text-center">SERVICES PVT. LTD.</p>
            </span>
          </span>
        </nav>
        <div
          style={{
            display: show ? "block" : "none",
          }}
          className="absolute z-50 bg-[#1a659e] top-20 rounded-b-md right-0 w-full transition duration-300"
        >
          <div className="bg-white mt-4 w-full py-4 px-2 flex flex-col items-center  gap-1 font-semibold md:hidden">
            {links?.map((link, idx) => (
              <Link
                key={idx}
                to={link.link}
                onClick={() => {
                  setShow(!show);
                }}
                className={classNames(
                  "px-2 py-2 w-full rounded-md border  cursor-pointer font-medium pb-1 border-b-2 transition duration-300  hover:text-primary-500 hover:border-b-2 tracking-wide  hover:border-primary-500",
                  isActive(link.link) ? "bg-red-100" : ""
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
