import React, { Component } from "react";
import { isEmpty } from "lodash";
import "./List.scss";

class List extends Component {
  render() {
    const { listData } = this.props;
    return (
      <div className="list">
        {!isEmpty(listData) ? (
          listData.map((item) => item)
        ) : (
          <div className="empty">No score's</div>
        )}
      </div>
    );
  }
}

List.defaultProps = {
  listData: [],
};

export default List;
