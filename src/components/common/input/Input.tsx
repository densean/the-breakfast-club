import { TextField } from "@radix-ui/themes";
import React, { ChangeEvent } from "react";
import { COLORS } from "../common.model";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  placholder?: string;
  label?: string;
  size: "1" | "2" | "3";
  radius?: "none" | "small" | "medium" | "large" | "full";
  variant?: "classic" | "surface" | "soft";
  color?: COLORS;
  className?: string;
  type?:
    | "number"
    | "hidden"
    | "date"
    | "datetime-local"
    | "email"
    | "month"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"
    | undefined;
  errorMessage?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export const WebInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "3",
      variant,
      label,
      radius,
      color,
      className,
      type = "text",
      errorMessage,
      placeholder,
      onChange = () => {},
      value,
    },
    ref
  ) => {
    return (
      <div className="">
        <span className="font-medium text-">{label}</span>
        <div className=" input-text">
          <TextField.Root
            size={size}
            type={type}
            variant={variant}
            radius={radius}
            color={color}
            className={`w-full ${errorMessage ? "border border-red-500" : ""} ${className}`}
            ref={ref}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
          ></TextField.Root>
        </div>
        {errorMessage && (
          <span className="text-red-500 text-sm">{errorMessage}</span>
        )}
      </div>
    );
  }
);
