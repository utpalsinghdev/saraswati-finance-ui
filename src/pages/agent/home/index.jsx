import React from "react";
import Cookie from "js-cookie";
import Image from "../../../components/ui/Image/Index";
import { NewspaperIcon, Users2Icon } from "lucide-react";
import useFetch from "../../../hooks/useFetch";
import Loader from "../../../components/loader";
import { Link } from "react-router-dom";
function HomeAgent() {
  const user = JSON.parse(Cookie.get("gafs_user"));
  const _agent = useFetch(`api/auth/profile/${user?.user?.id}`);
  return _agent.loading ? (
    <Loader />
  ) : (
    <div className="w-full ">
      <div className="flex justify-between items-center mx-4">
        <div className="flex items-start justify-start flex-col">
          <span>Welcome Back</span>
          <span>{user?.user?.firstName + " " + user?.user?.LastName}</span>
          <span>Designation: {user?.user?.designation}</span>
          <span>Agent Code: {user?.user?.employeeCode}</span>
        </div>
        <Image
          className={"rounded-full w-16 h-16"}
          src={
            _agent?.data?.AppointmentSalary?.[0]?.photo ||
            _agent?.data?.profilePic
              ? _agent?.data?.profilePic
                ? _agent?.data?.profilePic
                : _agent?.data?.AppointmentSalary?.[0]?.photo
              : "/fallback.png"
          }
        />
      </div>
      <Link
        to="/agent/customer/"
        className="w-full mt-4 flex rounded-md shadow-md px-4 py-3 bg-blue-200 items-center justify-evenly gap-4"
      >
        <Image src={"/application.png"} className="w-20 h-20" />

        <p className="text-start font-semibold text-blue-800">My Customers</p>
        <p className="text-start p-2 bg-green-400 rounded-xl">
          {_agent?.data?.Customer?.length}
        </p>
      </Link>
      <Link
        to="/agent/welcome/"
        className="w-full mt-4 flex rounded-md shadow-md px-4 py-3 bg-blue-200 items-center justify-evenly gap-4"
      >
        <Image src={"/welcome.png"} className="w-20 h-20" />
        <p className="text-start font-semibold text-blue-800">
          Welcome Letters
        </p>
        <p className="text-start p-2 bg-green-400 rounded-xl">
          {_agent?.data?.WelcomeLetter?.length}
        </p>
      </Link>
      <Link
        to="/agent/approval/"
        className="w-full mt-4 flex rounded-md shadow-md px-4 py-3 bg-blue-200 items-center justify-evenly gap-4 "
      >
        <Image src={"/approval.png"} className="w-20 h-20" />
        <p className="text-start font-semibold text-blue-800">
          Approval Letters
        </p>
        <p className="text-start p-2 bg-green-400 rounded-xl">
          {_agent?.data?.Customer?.map((c) => +c?.ApprovalLetter.length)}
        </p>
      </Link>
      <Link
        to="/agent/agents/"
        className="w-full mt-4 flex rounded-md shadow-md px-4 py-3 bg-blue-200 items-center justify-evenly gap-4"
      >
        <Image src={"/agent.png"} className="w-20 h-20" />
        <p className="text-start font-semibold text-blue-800">My Agents</p>
        <p className="text-start p-2 bg-green-400 rounded-xl">
          {_agent?.data?.managing?.length}
        </p>
      </Link>
    </div>
  );
}

export default HomeAgent;
