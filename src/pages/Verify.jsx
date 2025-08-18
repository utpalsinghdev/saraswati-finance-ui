import React, { useState } from "react";
import Input from "../components/ui/input";
import { Phone } from "lucide-react";
import Button from "../components/ui/button";
import { ImSpinner } from "react-icons/im";
import toast from "react-hot-toast";
import ApiService from "../services/Api_services";
import Image from "../components/ui/Image/Index";

function Verify() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [agent, setAgent] = useState(null);
  async function handleVefiy() {
    try {
      if (!phone) toast.error("Please enter number");
      if (phone.length !== 10) toast.error("Please enter a valid phone number");
      if (phone.length === 10) {
        setLoading(true);
        const res = await ApiService.fetchData({
          url: `api/agent/verify/${phone}`,
          method: "GET",
        });
        setAgent(res.data.data);
        setPhone("");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        typeof error?.response?.data?.message !== "string"
          ? "Something went wrong"
          : error.response.data.message
      );
    } finally {
      setLoading(false);
    }
  }
  const AgentCard = ({ agent }) => {
    return (
      <div className="flex flex-row gap-3 border border-green-300  rounded-md p-2">
        <Image
          className={"w-[110px] h-32 rounded-md"}
          src={agent?.profilePic ? agent?.profilePic : "/fallback.png"}
        />
        <div className="text-sm font-semibold flex flex-col justify-between">
          <h1 className="text-xl">
            {agent?.title + " " + agent?.firstName + " " + agent?.LastName}
          </h1>

          <p>
            <span className="font-bold">AgentID : </span>
            {agent?.employeeCode}
          </p>
          <p>
            <span className="font-bold">Designation : </span>
            {agent?.designation}
          </p>
          <p>
            <span className="font-bold">Mobile : </span>
            {"+91 " + agent?.phone}
          </p>
          <p>
            <span className="font-bold">City : </span>
            {agent?.city}
          </p>
        </div>
      </div>
    );
  };
  return (
    <div className="container mx-auto w-full md:w-[80%] px-8 my-5 md:mt-28 mt-20">
      <h1 className="text-xl font-bold text-center w-full">Verify Agent</h1>
      <div className="w-full flex items-center justify-center">
        <div
          className="max-w-md w-full flex items-center justify-center flex-col gap-2
        "
        >
          <Input
            label={""}
            name={"agentPhone"}
            placeholder={"Agent Phone"}
            type={"number"}
            value={phone}
            maxLength={10}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
            className={"w-full"}
            icon={<Phone className="text-green-800 w-5" />}
          />
          <button
            disabled={loading}
            onClick={handleVefiy}
            className={
              "flex rounded-md px-4 py-2 bg-indigo-600 text-white w-max"
            }
          >
            <span>Verify</span>
            {loading ? (
              <ImSpinner className="ml-2 w-5 h-5 text-white animate-spin" />
            ) : null}
          </button>
        </div>
      </div>
      <div className="mt-2 md:mt-5">
        {agent ? <AgentCard agent={agent} /> : null}
      </div>
    </div>
  );
}

export default Verify;
