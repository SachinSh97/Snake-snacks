import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { createBrowserHistory } from "history";

const Start = React.lazy(() => import("./start"));
const Game = React.lazy(() => import("./game"));

const history = createBrowserHistory();

export default class index extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/snack-time/lets-eat" component={Game} />
          <Route path="/snack-time" component={Start} />
          <Route path="/" render={() => <Redirect to={"/snack-time"} />} />
        </Switch>
      </Router>
    );
  }
}
