import React from "react";
import Table from "./Table";

function TableCombined() {
  const firstNames = ["jane", "john", "alex"];
  const lastName = ["smith", "jones"];

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
    {
      Header: "Other Info",
      columns: [
        {
          Header: "Age",
          accessor: "age",
          sortType: "basic",
        },
      ],
    },
  ];

  const [data, setData] = React.useState(
    Array(100)
      .fill()
      .map((a) => ({
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        lastName: lastName[Math.floor(Math.random() * lastName.length)],
        age: Math.ceil(75 * Math.random()),
      }))
  );
  const [originalData] = React.useState(data);
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setData(originalData);

  return (
    <div>
      <button onClick={resetData}>Reset Data</button>
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </div>
  );
}

export default TableCombined;
