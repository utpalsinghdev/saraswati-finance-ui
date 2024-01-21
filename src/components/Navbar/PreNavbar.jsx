import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import ContainerWrapper from "../ui/containtWrapper";
import {
  BriefcaseIcon,
  CaseLowerIcon,
  HeadphonesIcon,
  MailIcon,
} from "lucide-react";

function PreNavbar() {
  const location = useLocation();
  const myRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, myRef.current.offsetTop);
  }, [location.pathname]);
  return (
    <div
      ref={myRef}
      className="font-normal hidden md:block w-full bg-gradient-to-r from-cyan-500 to-blue-500  py-2 z-40"
    >
      <ContainerWrapper>
        <div className="flex justify-between items-center text-white">
          <div className="py-2 flex gap-2">
            <MailIcon />
            <a href="mailto:info@capitalgbs.in" rel="noreferrer">
              info@capitalgbs.in{" "}
            </a>
          </div>
          <div className="py-2 flex gap-2">
            <BriefcaseIcon />
            <p target="_blank" rel="noreferrer">
              Mon - Sat 10:00 AM - 5:00 PM
            </p>
          </div>
          <div className="py-2 flex gap-2">
            <HeadphonesIcon />
            <span className="flex gap-1" rel="noreferrer">
              <a
                href="tel:8477908496  "
                className="pr-2 border-r-2 border-white"
                target="_blank"
                rel="noreferrer"
              >
                8477908496
              </a>
              <a href="tel:8477908496" target="_blank" rel="noreferrer">
                8477908496
              </a>
            </span>
          </div>
        </div>
      </ContainerWrapper>
    </div>
  );
}

export default PreNavbar;
