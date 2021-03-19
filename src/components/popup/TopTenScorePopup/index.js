import React, { Component } from "react";
import { get, isEmpty } from "lodash";
import { apiRequestStatusCodes } from "../../../constants/global";
import { getTopTenScoreApi } from "../../../api";
import { storageName } from "../../../constants/global";
import { resource } from "../../../constants/configuration";
import { getItem } from "../../../utils/storage";
import "./TopTenScorePopup.scss";

const List = React.lazy(() => import("../../../components/List"));
const Popup = React.lazy(() => import("../../../components/popup"));

const popupConfig = resource.topTenScorePopupConfig;

class TopTenScorePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topTenScores: [],
    };
  }
  componentDidMount() {
    const userData = getItem(storageName);
    if (!isEmpty(userData) && !isEmpty(get(userData, "_id"))) {
      getTopTenScoreApi(get(userData, "_id", "")).then((response) => {
        if (
          apiRequestStatusCodes.FORBIDDEN.includes(get(response, "status", ""))
        ) {
          this.setState({ topTenScores: [] });
        } else {
          this.setState({ topTenScores: response });
        }
      });
    }
  }

  render() {
    const { open, heading, handleClose } = this.props;
    const listItem = get(this.state, "topTenScores", []).map((item, index) => (
      <div className="player-top-score_details" key={index}>
        <div className="player-top-score_details_name">{index + 1}</div>
        <div className="player-top-score_details_score">
          score : {get(item, "score", 0)}
        </div>
      </div>
    ));
    return (
      <div className="player-top-score">
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

TopTenScorePopup.defaultProps = {
  open: false,
  topTenScores: [],
  heading: popupConfig.title,
  handleClose: () => {},
};

export default TopTenScorePopup;
