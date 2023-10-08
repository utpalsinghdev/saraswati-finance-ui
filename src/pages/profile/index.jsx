import Cookies from "js-cookie";
import React from "react";
import useFetch from "../../hooks/useFetch";
import { LocateIcon, Phone, PoundSterling, UserCircle } from "lucide-react";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { GiTie } from "react-icons/gi";
import { ImUserTie } from "react-icons/im";
import { GoLocation } from "react-icons/go";

function Profile() {
  const user = JSON.parse(Cookies.get("gafs_user"));
  const _agent = useFetch(`api/auth/profile/${user?.user?.id}`);
  return (
    <div className="w-full h-[70vh] flex items-start flex-col justify-start">
      <h1 className="text-center w-full text-2xl font-semibold">My Profile</h1>
      <div className="border rounded-md shadow-lg flex flex-col gap-2 w-full px-4 py-2">
        <span className="text-md font-medium flex items-center gap-2">
          <UserCircle className="text-indigo-500" /> {_agent.data.title}{" "}
          {_agent.data.firstName} {_agent.data.LastName}
        </span>
        <span className="text-md font-medium flex items-center gap-2">
          <IdentificationIcon className="text-indigo-500 w-6" />{" "}
          {_agent.data.employeeCode}
        </span>
        <span className="text-md font-medium flex items-center gap-2">
          <Phone className="text-indigo-500 " /> +91 {_agent.data.phone}
        </span>
        <span className="text-md font-medium flex items-center gap-2">
          <ImUserTie className="text-indigo-500 w-6" />{" "}
          {_agent.data.designation}
        </span>
        <span className="text-md font-medium flex items-center gap-2">
          <GoLocation className="text-indigo-500 w-6" />{" "}
        </span>
      </div>
    </div>
  );
}

export default Profile;
