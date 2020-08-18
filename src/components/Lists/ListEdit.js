import MaterialTable from "material-table";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchListItems } from "../../actions";

class ListEdit extends Component {
  render() {
    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={[
            { title: "Adı", field: "name" },
            { title: "Soyadı", field: "surname" },
            { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
            {
              title: "Doğum Yeri",
              field: "birthCity",
              lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
            },
          ]}
          data={[
            {
              name: "Mehmet",
              surname: "Baran",
              birthYear: 1987,
              birthCity: 63,
            },
          ]}
          title="Demo Title"
        />
      </div>
    );
  }
}

export default connect(null, { fetchListItems })(ListEdit);
