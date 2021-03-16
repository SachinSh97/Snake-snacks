import React, { Component } from "react";
import { Suspense } from "react";
import Loading from "./components/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

const Main = React.lazy(() => import("./container"));
// const Loading = React.lazy(() => import("./components/Loading"));
class App extends Component {
  render() {
    return (
      <Suspense fallback={<Loading />}>
        <Main />
      </Suspense>
    );
  }
}
export default App;
