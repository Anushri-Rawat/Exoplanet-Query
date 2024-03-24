import React from "react";
import { useTable, useSortBy } from "react-table";
import columns from "../utils/columns";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function DataTable({ data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        disableSortRemove: true,
      },
      useSortBy
    );

  return (
    <div className="w-full self-start bg-white rounded-md shadow-md max-h-full overflow-y-auto overflow-x-scroll md:overflow-x-hidden">
      <table {...getTableProps()} className="w-full">
        <thead className="bg-white">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="p-4 border-b font-semibold uppercase text-center"
                >
                  <div className="flex justify-center items-center">
                    {column.render("Header")}
                    {/* <span className="ml-1 flex items-center">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FaArrowUp />
                        ) : (
                          <FaArrowDown />
                        )
                      ) : (
                        <>
                          <FaArrowUp />
                          <FaArrowDown />
                        </>
                      )}
                    </span> */}
                    <span className="ml-1 flex items-center">
                      <FaArrowUp
                        className={`cursor-pointer ${
                          column.isSorted && !column.isSortedDesc
                            ? "text-blue-500"
                            : ""
                        }`}
                        onClick={() => {
                          column.toggleSortBy(false, true);
                        }}
                      />
                      <FaArrowDown
                        className={`cursor-pointer ${
                          column.isSorted && column.isSortedDesc
                            ? "text-blue-500"
                            : ""
                        }`}
                        onClick={() => {
                          column.toggleSortBy(true, false);
                        }}
                      />
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className={`text-center p-4 ${
                      index === row.cells.length - 1 ? "" : "border-b"
                    }`}
                    key={cell.getCellProps().key}
                  >
                    {cell.column.id === "pl_name" ? (
                      <a
                        href={`https://exoplanetarchive.ipac.caltech.edu/overview//${cell.value}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-blue-500"
                      >
                        {cell.render("Cell")}
                      </a>
                    ) : (
                      cell.render("Cell")
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
