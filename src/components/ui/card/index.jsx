import React from "react";
import { classNames } from "../../../utils/classname";

const Card = ({
    children,
    variant = "default",
    className = "",
    hover = false,
    padding = "default",
    shadow = "default",
    border = true,
    onClick,
    ...props
}) => {
    const baseClasses = "transition-all duration-300";

    const variants = {
        default: "bg-white",
        elevated: "bg-white shadow-soft",
        outlined: "bg-white border border-neutral-200",
        filled: "bg-neutral-50",
        gradient: "bg-gradient-to-br from-primary-50 to-secondary-50",
    };

    const paddingSizes = {
        none: "",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
    };

    const shadowSizes = {
        none: "",
        sm: "shadow-sm",
        default: "shadow-soft",
        lg: "shadow-medium",
        xl: "shadow-large",
    };

    const hoverClasses = hover ? "hover:transform hover:scale-[1.02] hover:shadow-large cursor-pointer" : "";
    const borderClasses = border ? "border border-neutral-100" : "";

    const cardClasses = classNames(
        baseClasses,
        variants[variant],
        paddingSizes[padding],
        shadowSizes[shadow],
        borderClasses,
        hoverClasses,
        "rounded-xl",
        className
    );

    return (
        <div
            className={cardClasses}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
};

// Card sub-components
Card.Header = ({ children, className = "", ...props }) => (
    <div className={classNames("mb-4", className)} {...props}>
        {children}
    </div>
);

Card.Title = ({ children, className = "", ...props }) => (
    <h3 className={classNames("text-lg font-semibold text-neutral-900 mb-2", className)} {...props}>
        {children}
    </h3>
);

Card.Subtitle = ({ children, className = "", ...props }) => (
    <p className={classNames("text-sm text-neutral-600", className)} {...props}>
        {children}
    </p>
);

Card.Content = ({ children, className = "", ...props }) => (
    <div className={classNames("", className)} {...props}>
        {children}
    </div>
);

Card.Footer = ({ children, className = "", ...props }) => (
    <div className={classNames("mt-6 pt-4 border-t border-neutral-100", className)} {...props}>
        {children}
    </div>
);

export default Card; 