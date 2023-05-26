import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps } from "react";
import Spinner from "../Spinner/Spinner";

const buttonStyles = cva(
  "flex items-center justify-center rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-white dark:focus:ring-offset-black focus:ring-offset-1 disabled:opacity-60 disabled:pointer-events-none hover:bg-opacity-80",
  {
    variants: {
      intent: {
        primary: "bg-black text-white",
        secondary: "bg-gray-200",
      },
      fullWidth: {
        true: "w-full",
      },
      size: {
        small: "text-sm py-1.5 px-2",
        medium: "text-base py-2 px-4",
        large: "text-lg py-3 px-4",
      },
      disabled: {
        true: "cursor-not-allowed bg-gray-200 text-gray-400",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  }
);

type ButtonProps = VariantProps<typeof buttonStyles> &
  ComponentProps<"button"> & {
    isLoading?: boolean;
  };

export default function Button({
  intent,
  fullWidth,
  size,
  children,
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonStyles({ intent, fullWidth, size, disabled })}
      disabled={disabled}
      {...props}
    >
      {isLoading ? <Spinner size={size} /> : children}
    </button>
  );
}
