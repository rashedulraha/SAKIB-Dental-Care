"use client";

import React from "react";
import {
  useSecretTapGesture,
  type UseSecretTapGestureOptions,
} from "@/lib/hooks/useSecretTapGesture";

export interface HiddenAdminTriggerProps
  extends React.HTMLAttributes<HTMLElement>,
    UseSecretTapGestureOptions {
  /**
   * Semantic element type to render.
   * @default "div"
   */
  as?: "div" | "p" | "span" | "header" | "footer";
  children: React.ReactNode;
}

/**
 * Invisible wrapper component that detects secret multi-tap gestures.
 * Renders identically to normal UI elements without any visual hint or button appearance.
 */
export const HiddenAdminTrigger: React.FC<HiddenAdminTriggerProps> = ({
  as: Component = "div",
  children,
  className = "",
  style,
  onSuccess,
  config,
  enabled = true,
  onClick,
  ...rest
}) => {
  const { triggerProps, handleTap } = useSecretTapGesture<HTMLElement>({
    onSuccess,
    config,
    enabled,
  });

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    handleTap(e);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Component
      {...rest}
      ref={triggerProps.ref as React.Ref<any>}
      onClick={handleClick}
      className={`${triggerProps.className} ${className}`.trim()}
      style={{
        ...triggerProps.style,
        ...style,
      }}
    >
      {children}
    </Component>
  );
};
