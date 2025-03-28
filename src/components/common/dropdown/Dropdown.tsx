import React from "react";
import { Select } from "@radix-ui/themes";
import "./Dropdown.less";
import { COLORS, RADIUS } from "../common.model";
interface DropdownProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "size"
  > {
  size: "1" | "2" | "3";
  variant?: "classic" | "surface" | "soft" | "ghost";
  contentVariant?: "solid" | "soft";
  color?: COLORS;
  radius?: RADIUS;
  placeholder?: string;
  options: SelectValues[];
  label: string;
  errorMessage?: string;
  onChange: (val: string) => void;
}

interface SelectValues {
  value: string;
  label: string;
}

export const WebDropdown = React.forwardRef<
  HTMLInputElement,
  DropdownProps & { value: string; onChange: (val: string) => void }
>(
  (
    {
      size,
      variant,
      contentVariant,
      color,
      radius,
      placeholder,
      label,
      errorMessage,
      options,
      value,
      onChange,
    },
    ref
  ) => {
    return (
      <div className="web-dropdown">
        <span className="font-medium text-md">{label}</span>
        <Select.Root size={size} value={value} onValueChange={onChange}>
          <Select.Trigger
            className={`w-full border ${errorMessage ? "border border-red-500" : ""}`}
            variant={variant}
            color={color}
            radius={radius}
            placeholder={placeholder}
          />
          <Select.Content color={color} ref={ref} variant={contentVariant}>
            {options.map((option) => (
              <Select.Item key={option.value} value={option.value}>
                {option.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        {errorMessage && (
          <span className="text-red-500 text-sm">{errorMessage}</span>
        )}
      </div>
    );
  }
);
