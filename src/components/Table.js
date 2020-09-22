import React from "react";
import "./Table.css";

const Table = ({ countries }) => {
  // Sorting informations by cases
  const tableData = [...countries];
  tableData.sort((a, b) => b.cases - a.cases);

  return (
    <div className="table">
      {tableData.map(({ name, cases }) => (
        <tr>
          <td>{name}</td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
