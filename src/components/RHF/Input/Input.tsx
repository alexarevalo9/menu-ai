import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps } from "react";
import clsx from "clsx";
import { Controller, useFormContext } from "react-hook-form";

const inputStyles = cva("block rounded-md border-0 py-1.5", {
  variants: {
    intent: {
      primary:
        "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6",
      error:
        "pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6",
    },
    fullWidth: {
      true: "w-full",
    },
    disabled: {
      true: "cursor-not-allowed bg-gray-200 text-gray-400",
    },
  },
  defaultVariants: {
    intent: "primary",
    fullWidth: false,
  },
});

type InputProps = VariantProps<typeof inputStyles> &
  ComponentProps<"input"> & {
    labelText?: string;
    helperText?: string;
  };

export default function Input({
  className,
  intent,
  fullWidth,
  disabled,
  name,
  type,
  id,
  labelText,
  helperText,
  ...rest
}: InputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name ?? ""}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          {labelText && (
            <label
              htmlFor={id}
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {labelText}
            </label>
          )}
          <div className="mt-2">
            <input
              id={id}
              type={type}
              disabled={disabled}
              className={clsx(
                inputStyles({ intent, fullWidth, disabled }),
                className
              )}
              {...rest}
              {...field}
            />
          </div>
          <p
            className={clsx(
              intent === "error" ? "text-red-600" : "text-gray-500",
              "mt-2 text-sm"
            )}
            id={`${name ?? ""}-error`}
          >
            {error ? error?.message : helperText}
          </p>
        </div>
      )}
    />
  );
}
