import React from "react";
import useFetch from "../../../hooks/useFetch";
import Loader from "../../../components/loader";
import Cookie from "js-cookie";
import moment from "moment";
import { useNavigate } from "react-router-dom";
function ApprovalLetteragemt() {
  const Card = ({ item }) => {
    return (
      <div>
        <div className="mx-4 my-4 border px-4 py-2 rounded-md flex-col items-start flex">
          <span>For: {item?.customer?.name}</span>
          <span>loanId: {item?.customer?.loanId}</span>
          <span>
            Created At : {moment(item?.createdAt).format("DD/MM/YYYY")}
          </span>
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
      <h1 className="text-gray-700 text-2xl font-semibold">Approval Letters</h1>
      {_agent.loading ? (
        <Loader />
      ) : _agent?.data?.Customer.map((c) => +c?.ApprovalLetter?.length) ===
        0 ? (
        <p>No letters to display.</p>
      ) : (
        _agent.data.Customer.map((item, idx) => (
          <>
            {item?.ApprovalLetter?.map((item, idx) => (
              <Card key={idx} item={item} />
            ))}
          </>
        ))
      )}
    </div>
  );
}

export default ApprovalLetteragemt;
