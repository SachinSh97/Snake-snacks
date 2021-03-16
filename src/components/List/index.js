import React, { Component } from "react";
import "./List.scss";

class List extends Component {
  render() {
    const { listData } = this.props;
    return (
      <div className="list">
        {listData &&
          listData.map((item, index) => (
            <div className="list_item">
              <div className="list_title">{item.name}</div>
              <div className="list_description">{`score : ${item.topScore}`}</div>
            </div>
          ))}
      </div>
    );
  }
}

export default List;
