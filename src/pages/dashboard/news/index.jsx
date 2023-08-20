import React from "react";
import Table from "../../../components/ui/table/Table";

function News() {
  const columns = () => [
    {
      Header: "text",
      accessor: "text",
    },
  ];
  return (
    <Table
      title="News"
      subtitle={"News to display on website"}
      dataName={"News"}
      data={[
        { text: "Rom Rom Bhaiyo" },
        { text: "Rom Rom Bhaiyo" },
        { text: "Rom Rom Bhaiyo" },
        { text: "Rom Rom Bhaiyo" },
      ]}
      columns={columns()}
    />
  );
}

export default News;
