import React from "react";
import Image from "../../../components/ui/Image/Index";
import { StampIcon, Users2Icon } from "lucide-react";
import { NewspaperIcon } from "@heroicons/react/24/outline";
function DashboardHome() {
  return (
    <div className="w-full h-full flex items-center flex-col md:flex-row gap-8 justify-between transition-transform duration-300">
      <Image src={"/3556960.jpg"} />
      <div className="w-full h-full flex flex-col gap-4 mx-4">
        <div className="w-full flex rounded-md shadow-md px-8 py-6 bg-indigo-400 items-center justify-between">
          <span className="flex items-start gap-4 justify-between flex-col">
            <p className="text-start">Total Customer</p>
            <p className="text-start">00</p>
          </span>
          <Users2Icon className="w-16 h-16" />
        </div>
        <div className="w-full flex rounded-md shadow-md px-8 py-6 bg-indigo-400 items-center justify-between">
          <span className="flex items-start gap-4 justify-between flex-col">
            <p className="text-start">Total Customer</p>
            <p className="text-start">00</p>
          </span>
          <NewspaperIcon className="w-16 h-16" />
        </div>
        <div className=" w-full flex rounded-md shadow-md px-8 py-6 bg-indigo-400 items-center justify-between">
          <span className="flex items-start gap-4 justify-between flex-col">
            <p className="text-start">Total Customer</p>
            <p className="text-start">00</p>
          </span>
          <Users2Icon className="w-16 h-16" />
        </div>
        <div className="w-full flex rounded-md shadow-md px-8 py-6 bg-indigo-400 items-center justify-between">
          <span className="flex items-start gap-4 justify-between flex-col">
            <p className="text-start">Total Customer</p>
            <p className="text-start">00</p>
          </span>
          <StampIcon className="w-16 h-16" />
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
