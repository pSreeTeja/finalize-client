import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../stylesheets/inApp/viewSubmissions.css";
class ViewSubmission extends React.Component {
  render() {
    // console.log("MY TEAM DETAILS");
    // console.log(this.props.teamData);
    return (
      <div className="ViewSubmissionMainDiv">
        <div className="projectTitleDv">
          <span className="projectNameText">Project Name: </span>
          <span>{this.props.teamData.projectTitle}</span>
        </div>

        <div className="abstractProjectDiv">
          <span className="abstractText">Abstract :</span>
          <span>{this.props.teamData.abstract}</span>
        </div>
        {/* <div className="commentsProjectDiv">
          <span className="commentsText">Comments :</span>
          <textarea columns="50" rows="10" class="commentsField">
            {this.props.teamData.comments}
          </textarea>
        </div> */}

        <div className="teamMembersDiv">
          <span className="teamMembers">Team Members: </span>
          <span className="name">{this.props.teamData.teamMem1 + "\n"}</span>
          <span className="name">{this.props.teamData.teamMem2 + "\n"}</span>
          <span className="name">{this.props.teamData.teamMem3 + "\n"}</span>
          <span className="name">{this.props.teamData.teamMem4 + "\n"}</span>
        </div>

        <div className="linkProjectDiv">
          <span className="link">Link: </span>
          <a href={this.props.teamData.projectLink} target="_blank">
            {this.props.teamData.projectLink}
          </a>
        </div>
      </div>
    );
  }
}

export default ViewSubmission;
