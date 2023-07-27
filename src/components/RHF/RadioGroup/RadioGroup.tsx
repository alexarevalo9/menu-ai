import clsx from "clsx";
import { RadioGroup } from "@headlessui/react";
import { Controller, useFormContext } from "react-hook-form";

type Radio = {
  value: string;
  label: string;
  description?: string;
};

interface IRadioGroupProps {
  name: string;
  options: Radio[];
  alignCenter?: boolean;
  flexRow?: boolean;
}

export default function RadioGroupComponent({
  options,
  alignCenter,
  name,
  flexRow,
}: IRadioGroupProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup value={field.value} onChange={field.onChange} name={name}>
          <div
            className={clsx(
              flexRow ? "flex justify-center gap-4" : "space-y-4"
            )}
          >
            {options.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option.value}
                className={({ checked, active }) =>
                  clsx(
                    checked
                      ? "border-transparent bg-zinc-200"
                      : "border-gray-300",
                    active ? "border-gray-600 ring-2 ring-gray-600" : "",
                    "relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between",
                    flexRow && "grow"
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <span
                      className={clsx(
                        "flex items-center",
                        alignCenter && "w-full justify-center text-center"
                      )}
                    >
                      <span className="flex flex-col text-sm">
                        <RadioGroup.Label
                          as="span"
                          className="text-base font-medium text-gray-900"
                        >
                          {option.label}
                        </RadioGroup.Label>
                        {option.description ? (
                          <RadioGroup.Description
                            as="span"
                            className="text-gray-500"
                          >
                            {option.description}
                          </RadioGroup.Description>
                        ) : null}
                      </span>
                    </span>
                    <span
                      className={clsx(
                        active ? "border" : "border-2",
                        checked ? "border-gray-800" : "border-transparent",
                        "pointer-events-none absolute -inset-px rounded-lg"
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      )}
    />
  );
}
