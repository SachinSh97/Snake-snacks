import React, { Component } from "react";
import { get } from "lodash";
import { getItem } from "../../../utils/storage";

const List = React.lazy(() => import("../../List"));
const Popup = React.lazy(() => import("../../popup"));

class TopTenScorePopup extends Component {
  render() {
    const { open, handleClose } = this.props;
    const userData = getItem("Snake&Snack");
    const topScores = [];
    get(userData, "score", []).forEach((element, index) => {
      topScores.push({ topScore: element, name: index + 1 });
    });
    return (
      <>
        {topScores && (
          <Popup
            open={open}
            handleClose={handleClose}
            heading={`Top ${topScores.length} Score`}
          >
            <List listData={topScores} />
          </Popup>
        )}
      </>
    );
  }
}
export default TopTenScorePopup;
