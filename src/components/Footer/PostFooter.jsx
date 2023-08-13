import React from "react";
import { Link } from "react-router-dom";

function PostFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="container mx-auto w-[90%] flex justify-between items-center py-4 text-black">
      <span>
        All Right Reserved | Copyright &copy; {currentYear} Green Apple
        Financial Services Private Limited.
      </span>
      <span className="flex gap-8">
        <Link className="underline">FAQ&apos;s</Link>{" "}
        <Link className="underline">Terms & Condition</Link>
      </span>
    </div>
  );
}

export default PostFooter;
