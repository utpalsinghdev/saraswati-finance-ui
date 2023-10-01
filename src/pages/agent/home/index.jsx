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
    <div className="w-full">
      <div>
        <div className="flex items-start justify-start flex-col">
          <span>Good Morning</span>
          <span>{user?.user?.firstName + " " + user?.user?.LastName}</span>
          <span>Designation: {user?.user?.designation}</span>
        </div>
      </div>
      <Link
        to="/agent/customer/"
        className="w-full mt-4 flex rounded-md shadow-md px-8 py-6 bg-indigo-400 items-center justify-between"
      >
        <span className="flex items-start gap-4 justify-between flex-col">
          <p className="text-start">My Customers</p>
          <p className="text-start">{_agent?.data?.Customer?.length}</p>
        </span>
        <Users2Icon className="w-16 h-16" />
      </Link>
      <Link
        to="/agent/welcome/"
        className="w-full mt-4 flex rounded-md shadow-md px-8 py-6 bg-indigo-400 items-center justify-between"
      >
        <span className="flex items-start gap-4 justify-between flex-col">
          <p className="text-start">Welcome Letters</p>
          <p className="text-start">{_agent?.data?.WelcomeLetter?.length}</p>
        </span>
        <NewspaperIcon className="w-16 h-16" />
      </Link>
      <Link
        to="/agent/approval/"
        className="w-full mt-4 flex rounded-md shadow-md px-8 py-6 bg-indigo-400 items-center justify-between"
      >
        <span className="flex items-start gap-4 justify-between flex-col">
          <p className="text-start">Approval Letters</p>
          <p className="text-start">
            {_agent?.data?.Customer.map((c) => +c?.ApprovalLetter?.length)}
          </p>
        </span>
        <NewspaperIcon className="w-16 h-16" />
      </Link>
      <Link to="/agent/agents/" className="w-full mt-4 flex rounded-md shadow-md px-8 py-6 bg-indigo-400 items-center justify-between">
        <span className="flex items-start gap-4 justify-between flex-col">
          <p className="text-start">My Agents</p>
          <p className="text-start">{_agent?.data?.managing?.length}</p>
        </span>
        <Users2Icon className="w-16 h-16" />
      </Link>
    </div>
  );
}

export default HomeAgent;
