import React from "react";
import { useSortBy, useTable } from "react-table";

const data = [
  { firstName: "jane", lastName: "doe" },
  { firstName: "john", lastName: "smith" },
];

const columns = [
  {
    Header: "Name",
    columns: [
      {
        Header: "First Name",
        accessor: "firstName",
        sortType: "basic",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        sortType: "basic",
      },
    ],
  },
];

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default function TableSorting() {
  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}
