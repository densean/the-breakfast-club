import { Button } from "@radix-ui/themes";
import React, { MouseEventHandler } from "react";
import "./Button.less";
import { EyeOpenIcon, TrashIcon } from "@radix-ui/react-icons";
import { COLORS } from "../common.model";

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  size: "1" | "2" | "3" | "4";
  variant: "classic" | "solid" | "soft" | "surface" | "outline" | "ghost";
  disabled?: boolean;
  label?: string;
  iconComponent?: string;
  radius?: "none" | "small" | "medium" | "large" | "full";
  highContrast?: boolean;
  color?: COLORS;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const WebButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size,
      variant,
      disabled,
      label,
      iconComponent,
      radius,
      color,
      className,
      onClick = () => {},
    },
    ref
  ) => {
    return (
      <div className={`text-center ${className}`}>
        <Button
          size={size}
          variant={variant}
          disabled={disabled}
          ref={ref}
          radius={radius}
          color={color}
          onClick={onClick}
        >
          {label && <span className="text-center">{label}</span>}
          {iconComponent &&
            {
              view: <EyeOpenIcon />,
              delete: <TrashIcon />,
            }[iconComponent]}
        </Button>
      </div>
    );
  }
);
