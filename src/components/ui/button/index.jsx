import React from "react";
import { classNames } from "../../../utils/classname";

const defaultProps = {
  variant: "primary",
  size: "FULL",
  type: "button",
  loading: false,
  disabled: false,
  loadingText: "testing...",
};

function Button({
  className,
  loading,
  loadingText,
  variant,
  size,
  type,
  children,
  disabled,
  onClick,
  ...props
}) {
  const onClickHandler = (event) => {
    if (disabled || loading) return;
    onClick && onClick(event);
  };

  return (
    <button
      onClick={onClickHandler}
      className={classNames(
        "pushable rounded-3xl bg-blue-600 mt-2 disabled:cursor-not-allowed  hover:bg-blue-900  block ",
        variant === "primary" ? "bg-indigo-800" : "bg-gray-300",

        "text-base font-medium w-full text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm",
        className
      )}
      disabled={disabled}
      type={type}
      aria-label={type}
      {...props}
    >
      <span className="front  bg-green-600 hover:bg-green-700 px-4 py-2  rounded-3xl font-semibold ">
        {!loading && children}{" "}
        {loading && (
          <div className="flex items-center justify-center">
            <span className="flex items-center justify-center">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></span>
            </span>
            <span className="ltr:ml-1 rtl:mr-1 text-sm">{loadingText}</span>
          </div>
        )}
      </span>
    </button>
  );
}

Button.defaultProps = defaultProps;

export default Button;
