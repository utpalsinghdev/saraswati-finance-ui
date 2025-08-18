import React, { useState } from "react";
import { classNames } from "../../../utils/classname";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  success,
  disabled = false,
  required = false,
  icon,
  iconPosition = "left",
  className = "",
  fullWidth = true,
  helperText,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  const handleChange = (e) => {
    setHasValue(!!e.target.value);
    onChange && onChange(e);
  };

  const baseClasses = "relative";
  const widthClass = fullWidth ? "w-full" : "";

  const inputClasses = classNames(
    "w-full px-4 py-3 border rounded-lg transition-all duration-200 bg-white focus:outline-none focus:ring-2 focus:ring-offset-0",
    {
      "border-neutral-200 focus:border-primary-500 focus:ring-primary-500": !error && !success,
      "border-error-300 focus:border-error-500 focus:ring-error-500": error,
      "border-success-300 focus:border-success-500 focus:ring-success-500": success,
      "opacity-50 cursor-not-allowed": disabled,
      "pl-12": icon && iconPosition === "left",
      "pr-12": icon && iconPosition === "right",
    },
    className
  );



  const iconClasses = classNames(
    "absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center",
    {
      "left-4": iconPosition === "left",
      "right-4": iconPosition === "right",
    },
    "text-neutral-400 w-5 h-5"
  );

  return (
    <div className={classNames(baseClasses, widthClass)}>
      <div className="flex flex-col">
        {label && (
          <label className={classNames(
            "text-sm font-medium mb-2 transition-all duration-200",
            {
              "text-neutral-700": !error && !success,
              "text-error-600": error,
              "text-success-600": success,
            }
          )}>
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className={iconClasses}>
              {React.isValidElement(icon) ? React.cloneElement(icon, { className: "w-4 h-4" }) : React.createElement(icon, { className: "w-4 h-4" })}
            </div>
          )}

          <input
            type={type}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            required={required}
            className={inputClasses}
            placeholder={` ${placeholder}`}
            {...props}
          />
        </div>
      </div>

      {(error || success || helperText) && (
        <div className="mt-2 flex items-center">
          {error && (
            <div className="flex items-center text-error-600 text-sm">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center text-success-600 text-sm">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {success}
            </div>
          )}

          {helperText && !error && !success && (
            <div className="text-neutral-500 text-sm">
              {helperText}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
