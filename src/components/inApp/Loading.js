import "../../stylesheets/inApp/loading.css";
import React, { Component } from "react";
class Loading extends Component {
  state = {};
  render() {
    return (
      <div className="loadingMainDiv">
        <div className="loadingDiv"></div>
      </div>
    );
  }
}

export default Loading;
