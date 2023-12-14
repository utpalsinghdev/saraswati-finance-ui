import React, { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";
import { classNames } from "../../utils/classname";
import Brand from "../brand";
import Image from "../ui/Image/Index";
import { Headphones } from "lucide-react";
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
      name: "Career",
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
      <div className="w-full md:hidden bg-green-50 py-2 px-4">
        <div className="w-full flex flex-row items-center gap-4">
          <img src="/mic.svg" className="w-9 h-auto text-green-800" />
          <span className="w-full flex flex-col ">
            <a
              href="tel:7310801366"
              target="_blank"
              rel="noreferrer"
              className="text-blue-800 font-medium"
            >
              +19-7310801366
            </a>
            <a
              href="mailto:info@mahadevfinancial.in"
              target="_blank"
              rel="noreferrer"
              className="text-green-800 font-medium"
            >
              info@mahadevfinancial.in
            </a>
          </span>
        </div>
      </div>
      <div className="w-full md:hidden bg-green-50 py-2 px-4">
        <div className="w-full flex flex-row items-center gap-4">
          <img src="/clock.png" className="w-9 h-auto text-green-800" />
          <span className="w-full flex flex-col ">
            <p className="text-blue-800 font-medium">
              Mon - Sat 10:00 AM - 5:00 PM
            </p>
            <p className="text-green-800 font-medium">Sunday Closed</p>
          </span>
        </div>
      </div>
      <div
        className={classNames(
          "relative  md:mt-6 pb-4    md:px-0 transition duration-300",
          "bg-green-800 md:bg-white"
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
            className="md:hidden mt-4 cursor-pointer  w-6 h-6 ml-4"
          />
          <span className="md:hidden mt-4 ml-4 font-medium flex items-center justify-start gap-3 text-md">
            <Image
              src="/logo_without_name.png"
              className=" block md:hidden  w-32   cursor-pointer"
            />
            <p className="text-2xl text-[#B77E15] font-extrabold text-center">
              {" "}
              Mahadev Financial PVT LTD
            </p>
          </span>
        </nav>
        <div
          style={{
            display: show ? "block" : "none",
          }}
          className="absolute z-50 bg-green-800 top-20 rounded-b-md right-0 w-full transition duration-300"
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
