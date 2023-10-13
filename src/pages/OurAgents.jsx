import React from "react";
import ContainerWrapper from "../components/ui/containtWrapper";
import HeadingWrapper from "../components/ui/heading Wrapper";
import Select from "../components/ui/select";
import { BiIdCard } from "react-icons/bi";
import Input from "../components/ui/input";
import { ImagePlus, MailIcon, Phone, User2Icon } from "lucide-react";
import Button from "../components/ui/button";
import { SlLocationPin } from "react-icons/sl";
import Image from "../components/ui/Image/Index";
import { Formik } from "formik";
import axios from "axios";
import { toast } from "react-hot-toast";
import { agentApplicationSchema } from "../schemas";
import useFetch from "../hooks/useFetch";

function OurAgents() {
  const allEmployees = useFetch(`api/agent`);
  const AgentCard = ({ agent }) => {
    return (
      <div className="flex flex-row gap-3 border border-green-300  rounded-md p-2">
        <Image
          className={"w-24 rounded-md"}
          src={agent?.profilePic ? agent?.profilePic : "/fallback.png"}
        />
        <div className="text-sm font-semibold flex flex-col justify-between">
          <h1 className="text-xl">
            {agent?.title + " " + agent?.firstName + " " + agent?.LastName}
          </h1>
          <p>
            <span className="font-bold">Designation :</span> {agent?.role}
          </p>
          <p>
            <span className="font-bold">AgentID : </span>
            {agent?.employeeCode}
          </p>
          <p>
            <span className="font-bold">Mobile : </span>
            {"+91 " + agent?.phone}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100">
      <ContainerWrapper>
        <div className="p-0 md:p-4">
          <h1 className="text-3xl font-bold py-4 border-b-2 px-2 border-green-600">
            <span className="text-green-500">Our Agents</span>
          </h1>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 mx-auto sm:grid-cols-2 sm:gap-x-2 gap-x-4 gap-y-2">
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          {allEmployees?.data?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </ContainerWrapper>
    </div>
  );
}

export default OurAgents;
