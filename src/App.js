import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import React, { Component } from "react";

import LandingPage from "./containers/landingPage";
import My404Page from "./containers/404page";
import Dashboard from "./containers/inApp/dashboard";
import InvitePage from "./containers/inApp/invitePage";

function App() {
  const history = useHistory();
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <LandingPage history={history} />}
          />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route
            exact
            path="/invite/:groupid"
            component={InvitePage}
            history={history}
          />
          <Route exact path="/help" component={HelpPage} />
          <Route exact path="*" component={My404Page} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
