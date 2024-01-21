import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  NewspaperIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { classNames } from "../../utils/classname";
import Cookie from "js-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Users2Icon } from "lucide-react";
import Image from "../../components/ui/Image/Index";
import { cn } from "../../utils/cn";
const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: HomeIcon,
    current: false,
    access: ["ADMIN"],
  },
  {
    name: "News",
    href: "/admin/news",
    icon: NewspaperIcon,
    current: false,
    access: ["ADMIN"],
  },
  {
    name: "Career Application",
    href: "/admin/job-applications/",
    icon: DocumentDuplicateIcon,
    current: false,
    access: ["ADMIN"],
  },
  {
    name: "Agents",
    href: "/admin/agents",
    icon: UsersIcon,
    current: false,
    access: ["ADMIN"],
  },
  {
    name: "Loan Applications",
    href: "/admin/loan-applications",
    icon: DocumentDuplicateIcon,
    current: false,
    access: ["ADMIN"],
  },
  {
    name: "Customers",
    href: "/admin/customers/",
    icon: Users2Icon,
    current: false,
    access: ["ADMIN"],
  },
  {
    name: "Payment Qr",
    href: "/admin/payment-method/",
    icon: Users2Icon,
    current: false,
    access: ["ADMIN"],
  },
  // { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  // { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
const teams = [
  {
    id: 1,
    name: "Appointment letter",
    href: "/admin/appointment-letter/",
    initial: "A",
    current: false,
    access: ["ADMIN"],
  },
  {
    id: 2,
    name: "Welcome letter",
    href: "/admin/welcome-letter/",
    initial: "W",
    current: false,
    access: ["ADMIN"],
  },
  {
    id: 3,
    name: "I-card",
    href: "/admin/i-card",
    initial: "I",
    current: false,
    access: ["ADMIN"],
  },
  {
    id: 3,
    name: "approval Download",
    href: "/admin/approval-letter/",
    initial: "A",
    current: false,
    access: ["ADMIN"],
  },
  {
    id: 3,
    name: "DSA / DMA",
    href: "/admin/joint-percent-letter/",
    initial: "D",
    current: false,
    access: ["ADMIN"],
  },
];
const invoice = [
  {
    id: 2,
    name: "Welcome Invoice",
    href: "/admin/welcome-invoice/",
    initial: "W",
    current: false,
    access: ["ADMIN"],
  },
  {
    id: 3,
    name: "approval Invoice",
    href: "/admin/approval-invoice/",
    initial: "A",
    current: false,
    access: ["ADMIN"],
  },
];

export default function DashboardLayout({ children }) {
  let user = {};
  if (!!Cookie?.get("gafs_user")) {
    user = JSON?.parse(Cookie?.get("gafs_user"));
  }
  const location = useLocation();

  const isActive = (url) => {
    return location.pathname.split("/")[2] === url.split("/")[2];
  };
  const navigate = useNavigate();
  const onLogout = async () => {
    await Cookie.remove("gafs_user");
    if (!!Cookies.get("gafs_agent")) {
      window.location.reload();
      navigate("/agent/login");
    } else navigate("/admin/login");
    if (!Cookies.get("gafs_user")) {
      if (!!Cookies.get("gafs_agent")) {
      } else {
        window.location.reload();
      }
    }
  };
  const userNavigation = [
    {
      name: "Your profile",
      href: !!Cookies.get("gafs_agent") ? "/profile/me" : "#",
    },
    {
      name: "Sign out",
      href: "#",
      func: onLogout,
    },
  ];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
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
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-blue-900 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-20 w-auto"
                        src="/logo.png"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation
                              .filter((t) =>
                                t.access.includes(user?.user?.role)
                              )
                              ?.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    onClick={() =>
                                      setSidebarOpen((pre) => !pre)
                                    }
                                    to={item.href}
                                    className={classNames(
                                      isActive(item.href)
                                        ? "bg-green-700 text-white"
                                        : "text-indigo-200 hover:text-white hover:bg-green-600",
                                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                    )}
                                  >
                                    <item.icon
                                      className={classNames(
                                        item.current
                                          ? "text-white"
                                          : "text-indigo-200 group-hover:text-white",
                                        "h-6 w-6 shrink-0"
                                      )}
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-indigo-200">
                            {teams.filter((t) =>
                              t.access.includes(user?.user?.role)
                            ).length
                              ? "Letters"
                              : null}
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams
                              .filter((t) =>
                                t.access.includes(user?.user?.role)
                              )
                              ?.map((team) => (
                                <li key={team.name}>
                                  <Link
                                    to={team.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={classNames(
                                      isActive(team.href)
                                        ? "bg-green-700 text-white"
                                        : "text-indigo-200 hover:text-white hover:bg-green-600",
                                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                    )}
                                  >
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
                                      {team.initial}
                                    </span>
                                    <span className="truncate">
                                      {team.name}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-indigo-200">
                            {invoice.filter((t) =>
                              t.access.includes(user?.user?.role)
                            ).length
                              ? "Invoices"
                              : null}
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {invoice
                              .filter((t) =>
                                t.access.includes(user?.user?.role)
                              )
                              ?.map((team) => (
                                <li key={team.name}>
                                  <Link
                                    onClick={() => setSidebarOpen(false)}
                                    to={team.href}
                                    className={classNames(
                                      isActive(team.href)
                                        ? "bg-green-700 text-white"
                                        : "text-indigo-200 hover:text-white hover:bg-green-600",
                                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                    )}
                                  >
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
                                      {team.initial}
                                    </span>
                                    <span className="truncate">
                                      {team.name}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </li>
                        {/* <li className="mt-auto">
                          <Link className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white">
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                              aria-hidden="true"
                            />
                            Settings
                          </Link>
                        </li> */}
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-blue-900 px-6 pb-4">
            <div className="flex h-16 mt-2 shrink-0 items-center justify-center">
              <img
                className="h-[4.5rem] w-auto mt-2 w-auto ml"
                draggable="false"
                src="/logo_full.png"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation
                      .filter((t) => t.access.includes(user?.user?.role))
                      ?.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={classNames(
                              isActive(item.href)
                                ? "bg-green-700 text-white"
                                : "text-indigo-200 hover:text-white hover:bg-green-600",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-white"
                                  : "text-indigo-200 group-hover:text-white",
                                "h-6 w-6 shrink-0"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-indigo-200">
                    {teams.filter((t) => t.access.includes(user?.user?.role))
                      .length
                      ? "Letters"
                      : null}
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams
                      .filter((t) => t.access.includes(user?.user?.role))
                      ?.map((team) => (
                        <li key={team.name}>
                          <Link
                            to={team.href}
                            onClick={() => setSidebarOpen(false)}
                            className={classNames(
                              isActive(team.href)
                                ? "bg-green-700 text-white"
                                : "text-indigo-200 hover:text-white hover:bg-green-600",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                            )}
                          >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
                              {team.initial}
                            </span>
                            <span className="truncate">{team.name}</span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
                <li>
                  {invoice && (
                    <div className="text-xs font-semibold leading-6 text-indigo-200">
                      {invoice.filter((t) =>
                        t.access.includes(user?.user?.role)
                      ).length
                        ? "Invoices"
                        : null}
                    </div>
                  )}
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {invoice
                      .filter((t) => t.access.includes(user?.user?.role))
                      ?.map((team) => (
                        <li key={team.name}>
                          <Link
                            onClick={() => setSidebarOpen(false)}
                            to={team.href}
                            className={classNames(
                              isActive(team.href)
                                ? "bg-green-700 text-white"
                                : "text-indigo-200 hover:text-white hover:bg-green-600",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                            )}
                          >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
                              {team.initial}
                            </span>
                            <span className="truncate">{team.name}</span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
                {/* <li className="mt-auto">
                  <Link className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white">
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                      aria-hidden="true"
                    />
                    Settings
                  </Link>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            {user && user.user.role !== "ADMIN" ? null : (
              <>
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div
                  className="h-6 w-px bg-gray-900/10 lg:hidden"
                  aria-hidden="true"
                />
              </>
            )}

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                {/* //TODO: ADD Logo here */}
                <span
                  className={classNames(
                    " font-medium flex items-center justify-start gap-4 text-sm "
                  )}
                >
                  <img
                    src="/logo_without_name.png"
                    className="w-12 cursor-pointer mr-1"
                  />
                  <p className=" md:block text-xl sm:text-2xl md:text-2xl text-green-500 font-bold">
                    Captial Group Business Solution Pvt. Ltd.
                  </p>
                </span>
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    {console.log(user)}
                    <Image
                      className="h-8 w-8 rounded-full border-2 bg-gray-50"
                      src={
                        user?.user.profilePic
                          ? user?.user.profilePic
                          : "/fallback.png"
                      }
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        {user?.user?.name
                          ? user?.user?.name
                          : user?.user?.firstName + " " + user?.user?.LastName}
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation?.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              to={item.href}
                              onClick={item.func ? item.func : null}
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "block px-3 py-1 text-sm leading-6 text-gray-900"
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          {console.log(user?.user?.role !== "ADMIN")}
          <main
            className={cn(
              "py-5 md:py-10",
              user?.user?.role !== "ADMIN"
                ? "bg-[url('/bg.jpg')] bg-cover h-screen"
                : ""
            )}
          >
            <div className="px-4 sm:px-6 lg:px-8 ">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
