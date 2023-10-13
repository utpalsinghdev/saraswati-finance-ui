import React from "react";
import Image from "../../../components/ui/Image/Index";
import { StampIcon, Users2Icon } from "lucide-react";
import { NewspaperIcon } from "@heroicons/react/24/outline";
import useFetch from "../../../hooks/useFetch";
import Loader from "../../../components/loader";
function DashboardHome() {
  const _dashboard = useFetch("api/auth/dashboard");
  return _dashboard.loading ? (
    <Loader />
  ) : (
    <div className="w-full h-full flex items-center flex-col md:flex-row gap-8 justify-between transition-transform duration-300">
      <Image src={"/3556960.jpg"} />
      <div className="w-full h-full flex flex-col gap-4 mx-4">
        <div className="w-full flex rounded-md shadow-md px-8 py-6 bg-blue-500 items-center justify-between">
          <span className="flex items-start gap-4 justify-between flex-col">
            <p className="text-start">Total Customer</p>
            <p className="text-start">{_dashboard?.data?.customers}</p>
          </span>
          <Users2Icon className="w-16 h-16" />
        </div>
        <div className="w-full flex rounded-md shadow-md px-8 py-6 bg-blue-500 items-center justify-between">
          <span className="flex items-start gap-4 justify-between flex-col">
            <p className="text-start">Total News</p>
            <p className="text-start">{_dashboard?.data?.news}</p>
          </span>
          <NewspaperIcon className="w-16 h-16" />
        </div>
        <div className=" w-full flex rounded-md shadow-md px-8 py-6 bg-blue-500 items-center justify-between">
          <span className="flex items-start gap-4 justify-between flex-col">
            <p className="text-start">Total Agents</p>
            <p className="text-start">{_dashboard?.data?.agent}</p>
          </span>
          <Users2Icon className="w-16 h-16" />
        </div>
        <div className="w-full flex rounded-md shadow-md px-8 py-6 bg-blue-500 items-center justify-between">
          <span className="flex items-start gap-4 justify-between flex-col">
            <p className="text-start">Total Approvals</p>
            <p className="text-start">{_dashboard?.data?.approvals}</p>
          </span>
          <StampIcon className="w-16 h-16" />
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
