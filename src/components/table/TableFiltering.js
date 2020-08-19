import React from "react";
import { useFilters, useGlobalFilter, useTable } from "react-table";

const data = [
  { firstName: "jane", lastName: "doe", age: 20 },
  { firstName: "john", lastName: "smith", age: 21 },
];

const columns = [
  {
    Header: "Name",
    columns: [
      {
        Header: "First Name",
        accessor: "firstName",
        filter: "text",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        filter: "text",
      },
    ],
  },
  {
    Header: "Other Info",
    columns: [
      {
        Header: "Age",
        accessor: "age",
        filter: "text",
      },
    ],
  },
];

const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} records...`}
    />
  );
};

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows && preGlobalFilteredRows.length;

  return (
    <span>
      Search:{" "}
      <input
        value={globalFilter || ""}
        onChange={(e) => {
          setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`${count} records...`}
        style={{
          border: "0",
        }}
      />
    </span>
  );
};

const Table = ({ columns, data }) => {
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
    },
    useFilters,
    useGlobalFilter
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render("Header")}
                <div>{column.canFilter ? column.render("Filter") : null}</div>
              </th>
            ))}
          </tr>
        ))}
        <tr>
          <th
            colSpan={visibleColumns.length}
            style={{
              textAlign: "left",
            }}
          >
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </th>
        </tr>
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

export default function TableFiltering() {
  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}
