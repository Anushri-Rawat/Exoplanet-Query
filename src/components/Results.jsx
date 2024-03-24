import React from "react";
import NoResult from "./NoResult";
import DataTable from "./DataTable";

const Results = ({ resultsArr }) => {
  return resultsArr.length == 0 ? (
    <NoResult />
  ) : (
    <DataTable data={resultsArr} />
  );
};

export default Results;
