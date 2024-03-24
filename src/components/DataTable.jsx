import React from "react";
import { useTable, useSortBy } from "react-table";
import columns from "../utlis/columns";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function DataTable({ data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <div className="w-full self-start bg-white rounded-md shadow-md h-full overflow-y-auto overflow-x-scroll md:overflow-x-hidden">
      <table {...getTableProps()} className="w-full">
        <thead className="bg-white">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="p-4 border-b font-semibold uppercase text-center"
                >
                  <div className="flex justify-center items-center">
                    {column.render("Header")}
                    <span className="ml-1 flex items-center">
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
                    {cell.render("Cell")}
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
