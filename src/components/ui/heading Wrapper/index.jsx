import React from "react";
import ContainerWrapper from "../containtWrapper";

function HeadingWrapper({ children, title, heading }) {
  return (
    <ContainerWrapper>
      <div className="p-4">
        <h1 className="text-xl font-medium py-4 border-b-2 px-2 border-green-600">
          <span className="text-indigo-500">{heading} : </span>{" "}
          <span className="text-green-500">{title}</span>
        </h1>
        <div>{children}</div>
      </div>
    </ContainerWrapper>
  );
}

export default HeadingWrapper;
