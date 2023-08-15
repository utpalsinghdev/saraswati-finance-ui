import React from 'react'
import { Link, useLocation } from "react-router-dom";
function MobileNavbar() {
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
      const location = useLocation();
      const isActive = (url) => {
        return location.pathname.split("/")[1] === url.split("/")[1];
      };
  return (
    <div>MobileNavbar</div>
  )
}

export default MobileNavbar