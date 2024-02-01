import React from "react";
import { Link } from "react-router-dom";

function PostFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="container mx-auto w-[90%] flex justify-between items-center py-4 text-black">
      <span>
        All Right Reserved | Copyright &copy; {currentYear} Capital Group
        Business Solution Services Private Limited.
      </span>
    </div>
  );
}

export default PostFooter;
