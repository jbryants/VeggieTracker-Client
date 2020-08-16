import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLists } from "../../../actions";
import ListCreateFab from "./ListCreateFab";
import ListDetail from "./ListDetail";

import Grid from "@material-ui/core/Grid";

class ListList extends Component {
  componentDidMount() {
    // do something
    this.props.fetchLists();

    console.log("renderLists" + this.props.lists);
  }

  renderLists() {
    return this.props.lists.map((list) => {
      return (
        <ListDetail
          id={list.id}
          name={list.name}
          shop={list.shop}
          listItems={list.listitem_set}
          key={list.id}
          onClick={() => {
            console.log(list.id + " " + list.name);
          }}
        />
      );
    });
  }

  render() {
    return (
      <Grid container spacing={3}>
        {this.renderLists()}
        <ListCreateFab />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return { lists: Object.values(state.listReducers) };
};

export default connect(mapStateToProps, { fetchLists })(ListList);
