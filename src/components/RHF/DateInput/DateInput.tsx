import clsx from "clsx";
import React, { type ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IDateInputProps {
  fullWidth?: boolean;
  labelText?: string;
}

type InputProps = IDateInputProps &
  ComponentProps<"input"> & {
    labelText?: string;
    helperText?: string;
  };

export default function DateInput({
  fullWidth,
  labelText,
  helperText,
  id,
  name,
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
          <input
            id={id}
            type="date"
            className={clsx(
              fullWidth && "w-full",
              "block rounded-md border-0 px-6 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            )}
            {...rest}
            {...field}
          />
          <p
            className={clsx(
              error ? "text-red-600" : "text-gray-500",
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
