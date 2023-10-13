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
        className="   w-12   cursor-pointer mr-1"
      />
      <p className="text-lg text-green-500 font-bold">
        Caslon Business services Pvt. Ltd.
      </p>
    </span>
  );
}

export default Brand;
