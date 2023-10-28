import React from "react";
import { classNames } from "../../utils/classname";

function Brand({ className }) {
  return (
    <span
      className={classNames(
        " font-medium  items-center justify-between gap-4 text-sm ",
        className
      )}
    >
      <img
        src="/logo_without_name.png"
        className="   w-20   cursor-pointer mr-1"
      />
      <p className="text-xl text-green-800 font-extrabold">
        Aaradhya Financial Pvt. Ltd.
      </p>
    </span>
  );
}

export default Brand;
