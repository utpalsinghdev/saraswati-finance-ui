import React from "react";
import Image from "../components/ui/Image/Index";

function Pay() {
  return (
    <div className="w-full flex items-center justify-center mt-20 md:mt-28">
      <div className="flex w-[23rem] md:w-[40rem]  flex-col pt-8 pb-8 mb-4 shadow-lg shadow-blue-700 hover:shadow-red-800 rounded-2xl items-center md:justify-around justify-center px-2 gap-4">
        <Image src={"/pay.png"} className={"w-96 h-64 rounded-xl"} />
        <div className="flex flex-col items-center justify-between">
          <span className="text-3xl self-center font-bold text-red-600">
            Company Payment Details
          </span>
          <span className="mt-4 px-4 text-center font-semibold text-secondary-200 text-md">
            Please Note we only charge for file charge and processing fee only
            in company account. Please do not pay any amount in any other person
            account.
          </span>
          <span className="self-center mt-4 md:self-auto">
            {/* <div>
              <p>
                <span className="font-bold">Bank Name : </span> Canera Bank
              </p>
              <p>
                <span className="font-bold">Account Name : </span> Mahadev
                Financial Pvt Ltd
              </p>
              <p>
                <span className="font-bold">Account Number : </span>{" "}
                110119513797
              </p>
              <p>
                <span className="font-bold">IFSC Code : </span> CNRB0008320
              </p>
            </div> */}
            NO PAYMENT DETAILS AVAILABLE
          </span>
        </div>
      </div>
    </div>
  );
}

export default Pay;
