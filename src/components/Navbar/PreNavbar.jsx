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
      className="font-normal hidden md:block w-full bg-blue-900 py-2 z-40"
    >
      <ContainerWrapper>
        <div className="flex justify-between items-center text-white">
          <div className="py-2 flex gap-2">
            <MailIcon />
            <a href="mailto:info@vandhnamservices.com" rel="noreferrer">
              info@caslonservices.in
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
                href="tel:928XXXX033"
                className="pr-2 border-r-2 border-white"
                target="_blank"
                rel="noreferrer"
              >
                928XXXX033
              </a>
              <a href="tel:928XXXX033" target="_blank" rel="noreferrer">
                928XXXX033
              </a>
            </span>
          </div>
        </div>
      </ContainerWrapper>
    </div>
  );
}

export default PreNavbar;
