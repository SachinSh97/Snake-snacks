import React, { Component } from "react";

import { data } from "../../../dummyData";

const Popup = React.lazy(() => import("../../popup"));
const List = React.lazy(() => import("../../List"));
const Loader = React.lazy(() => import("../../Loading"));

class TopPlayerPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topScores: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.setState({ topScores: data.topTenScore, loading: false });
  }

  render() {
    const { open, handleClose } = this.props;
    const { loading, topScores } = this.state;
    return (
      <>
        {loading && <Loader />}
        {topScores && (
          <Popup
            open={open}
            handleClose={handleClose}
            heading="Top player's"
            children={<List listData={topScores} />}
          />
        )}
      </>
    );
  }
}
export default TopPlayerPopup;
