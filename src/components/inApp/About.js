import React, { Component } from "react";
import "../../stylesheets/inApp/about.css";
class About extends React.Component {
  render() {
    return (
      <div className="aboutMainDiv">
        <div className="projectTitleDiv">
          <span className="projectTitleText">Project Title:</span>
          <span>{this.props.groupData.projectTitle}</span>
        </div>
        <div className="aboutProjectDiv">
          <span className="aboutText">About project:</span>
          <span>{this.props.groupData.aboutProject}</span>
        </div>
        {this.props.isTeacher && (
          <div className="groupLinkDiv">
            <span className="groupLinkText">Link:</span>
            <span>{this.props.groupData.link}</span>
          </div>
        )}
      </div>
    );
  }
}

export default About;
