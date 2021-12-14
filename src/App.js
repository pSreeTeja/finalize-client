import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import React, { Component } from "react";

import LandingPage from "./containers/landingPage";
import Topbar from "./components/inApp/Topbar";
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
          {/* <Route exact path="/Topbar" component={Topbar} /> */}
          <Route
            exact
            path="/invite/:groupid"
            component={InvitePage}
            history={history}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
