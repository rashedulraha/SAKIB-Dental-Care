import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  cleanPadding?: boolean;
}

/**
 * Reusable Container component that enforces the centralized global max-width
 * (governed by `--site-max-width` in `src/styles/_variables.scss` and `max-w-site`).
 * Provides responsive horizontal gutters (16px mobile, 24px tablet, 32px desktop).
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  as: Component = "div",
  className = "",
  cleanPadding = false,
  ...props
}) => {
  return (
    <Component
      className={`site-container ${cleanPadding ? "!px-0" : ""} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
