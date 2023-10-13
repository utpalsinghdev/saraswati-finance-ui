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
      name: "Career",
      link: "/Career",
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
      <div className="relative  md:mt-6 pb-4  bg-blue-800 md:bg-white  md:px-0 transition duration-300">
        <nav className="relative flex items-center justify-start md:justify-between">
          <Link to="/">
            <img
              src="/logo_full.png"
              className="hidden md:block absolute w-28 md:w-56  -top-5 text-2xl font-extrabold font-serif cursor-pointer transition duration-300 hover:text-primary-500"
            />
          </Link>
          <div className="hidden md:flex items-center justify-end w-full  gap-4">
            <div className=" flex items-center  justify-between gap-4 font-normal ">
              {links.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.link}
                  className={classNames(
                    "cursor-pointer font-medium pb-1 border-b-2 transition duration-300  py-1 px-2 rounded-md border-white hover:text-gray-700 hover:border-b-2 tracking-wide  hover:border-primary-500 ",
                    isActive(link.link) ? "bg-orange-200" : ""
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
          <span className="md:hidden mt-4 ml-4 font-medium flex items-center justify-between gap-4 text-md">
            <img
              src="/logo_without_name.png"
              className=" block md:hidden  w-14   cursor-pointer mr-1"
            />
            <p className="text-2xl text-orange-500 font-bold">
              Caslon Business services Pvt. Ltd.
            </p>
          </span>
        </nav>
        <div
          style={{
            display: show ? "block" : "none",
          }}
          className="absolute z-50 bg-blue-800 top-20 rounded-b-md right-0 w-full transition duration-300"
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
                  isActive(link.link) ? "bg-orange-200" : ""
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
