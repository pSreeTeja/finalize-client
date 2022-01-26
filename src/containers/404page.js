import React, { Component } from "react";
import "../stylesheets/404Page.css";
import Img from "../media/404Img.svg";
class My404Page extends Component {
  state = {};
  render() {
    return (
      <div className="mainDiv404">
        <img className="img" src={Img} alt="img" />
        <span className="pageNotFoundText">Page Not Found</span>
        <a href="https://finalize.netlify.app/">Back to Home</a>
      </div>
    );
  }
}

export default My404Page;
