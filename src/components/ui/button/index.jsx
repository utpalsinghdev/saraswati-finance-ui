import React from "react";
import { classNames } from "../../../utils/classname";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  loading = false,
  loadingText = "Loading...",
  icon,
  iconPosition = "left",
  fullWidth = false,
  type = "button",
  onClick,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-soft hover:shadow-medium focus:ring-primary-500 transform hover:scale-105",
    secondary: "bg-white hover:bg-neutral-50 text-primary-600 border border-primary-200 shadow-soft hover:shadow-medium focus:ring-primary-500 transform hover:scale-105",
    ghost: "bg-transparent hover:bg-neutral-100 text-neutral-700 focus:ring-neutral-500",
    danger: "bg-error-600 hover:bg-error-700 text-white shadow-soft hover:shadow-medium focus:ring-error-500 transform hover:scale-105",
    success: "bg-success-600 hover:bg-success-700 text-white shadow-soft hover:shadow-medium focus:ring-success-500 transform hover:scale-105",
    outline: "bg-transparent hover:bg-neutral-50 text-neutral-700 border border-neutral-300 focus:ring-neutral-500",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const buttonClasses = classNames(
    baseClasses,
    variants[variant],
    sizes[size],
    widthClass,
    className
  );

  const renderIcon = () => {
    if (!icon) return null;

    const iconClasses = classNames(
      size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5",
      iconPosition === "right" ? "ml-2" : "mr-2"
    );

    return (
      <span className={iconClasses}>
        {React.isValidElement(icon) ? icon : React.createElement(icon)}
      </span>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {loadingText}
        </>
      );
    }

    return (
      <>
        {icon && iconPosition === "left" && renderIcon()}
        {children}
        {icon && iconPosition === "right" && renderIcon()}
      </>
    );
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
