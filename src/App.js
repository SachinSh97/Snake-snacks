import React, { Component, Suspense } from "react";
import "./App.scss";

const Start = React.lazy(() => import("./container/start"));

class App extends Component {
  render() {
    return (
      <Suspense fallback={<div>Loading....</div>}>
        <Start />
      </Suspense>
    );
  }
}
export default App;
