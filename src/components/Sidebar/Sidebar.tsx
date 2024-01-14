import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UserButton, useUser } from "@clerk/nextjs";
import clsx from "clsx";
import Image from "next/image";
import {
  Bars3Icon,
  XMarkIcon,
  ChatBubbleLeftIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { IMAGES } from "@/constants/images";
import Button from "../Button/Button";
import { useMenuStore } from "@/store/menuStore";
import { PATH_WEBAPP } from "@/routes/paths";
import Link from "next/link";
import { useRouter } from "next/router";
import withIsClient from "@/hocs/renderInClient";

const Navigation = withIsClient(() => {
  const { user } = useUser();
  const { menuData } = useMenuStore();
  const router = useRouter();
  const pathname = router.asPath;

  const generatePathname = (id: string) => `${PATH_WEBAPP.menus}/${id}`;

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
      <Link href={PATH_WEBAPP.root} className="flex flex-col">
        <Button className="-mx-2 mt-2 space-y-1 !p-2">
          <div className="flex w-full items-center justify-between">
            <span className="flex items-center">
              <Image
                width={28}
                height={28}
                className="h-7 w-auto"
                src={IMAGES.CHEF_LOGO_WHITE}
                alt="chef logo"
              />
              <span className="pl-2">New menu</span>
            </span>
            <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
          </div>
        </Button>
      </Link>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {menuData.chatsMenu.map((item) => (
                <li key={item.id}>
                  <Link
                    href={generatePathname(item.id)}
                    className={clsx(
                      generatePathname(item.id) == pathname
                        ? "bg-gray-200 text-black"
                        : "text-gray-500 hover:bg-gray-200 hover:text-black",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6"
                    )}
                  >
                    <ChatBubbleLeftIcon
                      className={clsx(
                        generatePathname(item.id) == pathname
                          ? "text-black"
                          : "text-gray-500 group-hover:text-black",
                        "h-6 w-6 shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mt-auto">
            <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
              <UserButton
                afterSignOutUrl="/sign-in"
                appearance={{
                  elements: {
                    userButtonBox: "flex-row-reverse",
                  },
                }}
              />
              <span aria-hidden="true">{user?.fullName}</span>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
});

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <Navigation />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <Navigation />
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-center text-sm font-semibold leading-6 text-gray-900">
          Menu
        </div>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </>
  );
}
