import React, { Component } from "react";
import { isEmpty, get } from "lodash";
import { apiRequestStatusCodes } from "../../../constants/global";
import { resource } from "../../../constants/configuration";
import { getTopTenPlayerApi } from "../../../api";
import "./TopPlayerListPopup.scss";

const Popup = React.lazy(() => import("../../../components/popup"));
const List = React.lazy(() => import("../../../components/List"));

const popupConfig = resource.topPlayerPopupConfig;

class TopPlayerPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topTenScores: [],
    };
  }

  componentDidMount() {
    getTopTenPlayerApi().then((response) => {
      if (
        apiRequestStatusCodes.FORBIDDEN.includes(get(response, "status", ""))
      ) {
        this.setState({ topTenScores: [] });
      } else {
        this.setState({ topTenScores: response });
      }
    });
  }

  render() {
    const { open, handleClose, heading } = this.props;
    const listItem = get(this.state, "topTenScores", []).map((item) => (
      <div className="top-ten-score_details" key={get(item, "_id", "")}>
        <div className="top-ten-score_details_name">
          {get(item, "scoredBy.userName", "")}
        </div>
        <div className="top-ten-score_details_score">
          score : {get(item, "score", 0)}
        </div>
      </div>
    ));
    return (
      <div className="top-ten-score">
        {listItem && (
          <Popup
            open={open}
            handleClose={handleClose}
            heading={heading}
            children={<List listData={listItem} />}
          />
        )}
      </div>
    );
  }
}

TopPlayerPopup.defaultProps = {
  open: false,
  heading: popupConfig.title,
  handleClose: () => {},
};

export default TopPlayerPopup;
