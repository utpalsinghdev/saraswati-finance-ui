import React from "react";
import useFetch from "../../../hooks/useFetch";
import Loader from "../../../components/loader";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

function AgentLogs() {
  const Card = ({ item }) => {
    return (
      <div>
        <div className="mx-4 my-4 border px-4 py-2 rounded-md flex-col items-start flex">
          <span>
            Agent Name: {item?.firstName} {item?.LastName}{" "}
          </span>
          <span>Designation: {item?.designation}</span>
          <span>Employee Code: {item?.employeeCode}</span>
          <span>Phone:{item?.phone}</span>
        </div>
      </div>
    );
  };

  const user = JSON.parse(Cookie.get("gafs_user"));
  const _agent = useFetch(`api/auth/profile/${user?.user?.id}`);
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back
      </button>
      <h1 className="text-gray-700 text-2xl font-semibold">My Agents</h1>
      {_agent.loading ? (
        <Loader />
      ) : _agent.data.managing.length === 0 ? (
        <p>No agents to display.</p>
      ) : (
        _agent.data.managing?.map((item, idx) => <Card key={idx} item={item} />)
      )}
    </div>
  );
}

export default AgentLogs;
