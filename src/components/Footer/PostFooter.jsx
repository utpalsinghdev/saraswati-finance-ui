import React from "react";
import { Link } from "react-router-dom";
import useSiteConfig from "../../hooks/useSiteConfig";

function PostFooter() {
  const { config, loading } = useSiteConfig();
  const currentYear = new Date().getFullYear();

  if (loading) {
    return (
      <div className="container mx-auto w-[90%] flex justify-between items-center py-4 text-black">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto w-[90%] flex justify-between items-center py-4 text-black">
      <span>
        All Right Reserved | Copyright &copy; {currentYear} {config?.title || "Saraswati Financial Services Private Limited"}
      </span>
    </div>
  );
}

export default PostFooter;
