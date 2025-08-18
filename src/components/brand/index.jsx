import React from "react";
import { classNames } from "../../utils/classname";
import metaData from "../../utils/lib/site.config";

function Brand({ className, imgClass }) {
  return (
    <span
      className={classNames(
        " font-medium  items-center justify-between gap-4 text-sm ",
        className
      )}
    >
      <img src="/logo.png" className={classNames("   w-[5rem]   cursor-pointer mr-1", imgClass)} />
    </span>
  );
}

export default Brand;
