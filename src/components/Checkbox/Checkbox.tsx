import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const checkBoxStyles = cva("h-5 w-5 border-[3px] focus:ring-0", {
  variants: {
    intent: {
      primary: "text-black",
      error: "text-red-600 border-red-400 bg-red-100",
    },
    disabled: {
      true: "opacity-40 cursor-not-allowed",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

type CheckboxProps = VariantProps<typeof checkBoxStyles> &
  ComponentProps<"input">;

export default function Checkbox({
  disabled,
  intent,
  ...props
}: CheckboxProps) {
  return (
    <input
      className={checkBoxStyles({ intent, disabled })}
      type="checkbox"
      disabled={disabled}
      {...props}
    />
  );
}
