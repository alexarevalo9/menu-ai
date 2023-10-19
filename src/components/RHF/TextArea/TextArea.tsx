import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps } from "react";
import clsx from "clsx";
import {
  Controller,
  useFormContext,
  type ControllerRenderProps,
  type FieldError,
  type FieldValues,
} from "react-hook-form";

const textAreaStyles = cva("block rounded-md border-0 py-1.5", {
  variants: {
    intent: {
      menu: "text-gray-900 focus:ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6 resize-none",
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

type InputProps = VariantProps<typeof textAreaStyles> &
  ComponentProps<"textarea"> & {
    labelText?: string;
    helperText?: string;
    field: ControllerRenderProps<FieldValues, string>;
    error: FieldError | undefined;
  };

export function TextAreaStory({
  className,
  intent,
  fullWidth,
  disabled,
  name,
  id,
  labelText,
  helperText,
  field,
  error,
  ...rest
}: InputProps) {
  return (
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
        <textarea
          id={id}
          disabled={disabled}
          className={clsx(
            textAreaStyles({ intent, fullWidth, disabled }),
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
  );
}

export default function TextArea({
  className,
  intent,
  fullWidth,
  disabled,
  name,
  id,
  labelText,
  helperText,
  ...rest
}: Omit<InputProps, "error" | "field">) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name ?? ""}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextAreaStory
          className={className}
          intent={intent}
          fullWidth={fullWidth}
          disabled={disabled}
          id={id}
          name={name}
          labelText={labelText}
          helperText={helperText}
          field={field}
          error={error}
          {...rest}
        />
      )}
    />
  );
}
