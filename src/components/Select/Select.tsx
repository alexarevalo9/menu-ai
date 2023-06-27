import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import clsx from "clsx";
import { type VariantProps, cva } from "class-variance-authority";

const selectStyles = cva(
  "relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-sm sm:leading-6",
  {
    variants: {
      size: {
        small: "text-sm py-1.5 px-2",
        medium: "text-base py-2 px-4",
        large: "text-lg py-3 px-4",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

type SelectProps = VariantProps<typeof selectStyles> & {
  mainIcon?: React.ReactNode;
  items: {
    id: number;
    name: string;
    avatar?: string;
  }[];
};

export default function Select({ items, mainIcon, size }: SelectProps) {
  const [selected, setSelected] = useState(items[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
            Assigned to
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className={clsx(selectStyles({ size }))}>
              <span className="flex items-center">
                {mainIcon ? mainIcon : null}
                {selected?.avatar && (
                  <Image
                    src={selected.avatar}
                    width={20}
                    height={20}
                    alt="avatar"
                    className="h-5 w-5 flex-shrink-0 rounded-full"
                  />
                )}
                <span className="ml-3 block truncate">{selected?.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={clsx(
                  "absolute z-10 mt-1 max-h-56 w-full  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                )}
              >
                {items.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      clsx(
                        active ? "bg-gray-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {person.avatar && (
                            <Image
                              src={person.avatar}
                              width={20}
                              height={20}
                              alt="avatar"
                              className="h-5 w-5 flex-shrink-0 rounded-full"
                            />
                          )}
                          <span
                            className={clsx(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {person.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={clsx(
                              active ? "text-white" : "text-gray-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
