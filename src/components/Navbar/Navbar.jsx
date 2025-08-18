import React, { useEffect, useState, Fragment } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { classNames } from "../../utils/classname";
import Brand from "../brand";
import Button from "../ui/button";
import { Phone, User, Menu } from "lucide-react";
import metaData from "../../utils/lib/site.config";
import { Dialog, Transition } from "@headlessui/react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (url) => {
    return location.pathname.split("/")[1] === url.split("/")[1];
  };

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Loan Services", href: "/services/loan" },
    { name: "Agent Joining", href: "/Career" },
    // { name: "Payment", href: "/pay" },
    { name: "Verify Agent", href: "/verify-agent" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const quickActions = [
    { name: "Apply Now", href: "/apply-loan", primary: true },
    { name: "Customer Login", href: "/c/login", icon: User },
  ];

  return (
    <nav
      className={classNames(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || !isHomePage
          ? "bg-white/95 backdrop-blur-md shadow-soft border-b border-neutral-100"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Brand className="h-8 lg:h-10" imgClass="w-[7rem]" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  "text-sm font-medium transition-colors duration-200 relative group",
                  isActive(item.href)
                    ? (isScrolled || !isHomePage) ? "text-primary-600" : "text-white"
                    : (isScrolled || !isHomePage) ? "text-neutral-700 hover:text-primary-600" : "text-white/90 hover:text-white"
                )}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className={classNames(
                    "absolute -bottom-1 left-0 w-full h-0.5 rounded-full",
                    (isScrolled || !isHomePage) ? "bg-primary-600" : "bg-white"
                  )} />
                )}
                <span className={classNames(
                  "absolute -bottom-1 left-0 w-0 h-0.5 rounded-full transition-all duration-200 group-hover:w-full",
                  (isScrolled || !isHomePage) ? "bg-primary-600" : "bg-white"
                )} />
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">


            {/* Quick Actions */}
            {quickActions.map((action) => (
              <Button
                key={action.name}
                variant={action.primary ? "primary" : "secondary"}
                size="sm"
                icon={action.icon}
                onClick={() => window.location.href = action.href}
              >
                {action.name}
              </Button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              icon={isOpen ? XMarkIcon : Bars3Icon}
              onClick={() => setIsOpen(!isOpen)}
              className={classNames(
                "p-2 transition-colors duration-200",
                (isScrolled || !isHomePage) ? "text-neutral-700" : "text-white"
              )}
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <Transition.Root show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setIsOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>

                  {/* Mobile Sidebar */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-blue-900/60 backdrop-blur-md px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center justify-center">
                      <img
                        className="h-20 mt-3 w-[15rem]"
                        src="/logo.png"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  to={item.href}
                                  onClick={() => setIsOpen(false)}
                                  className={classNames(
                                    isActive(item.href)
                                      ? "bg-pink-700 text-white"
                                      : "text-indigo-200 hover:text-white hover:bg-pink-300",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>


                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </nav>
  );
};

export default Navbar;
