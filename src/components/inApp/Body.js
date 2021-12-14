import React, { Component } from "react";
import "../../stylesheets/inApp/body.css";
import CreateGroup from "./CreateGroup";
import GroupsList from "./GroupsList";
import GroupInfo from "./GroupInfo";
class Body extends React.Component {
  render() {
    // console.log("from body to groupInfo ");
    // console.log(this.props.groupData);
    // console.log(this.props.submittedDisplay);
    return (
      <div className="bodyDiv">
        <div className="headingForDiv">
          <span className="createGroupHeading">{this.props.bodyName}</span>
          {this.props.projectDeadline && (
            <span className="projectDeadline">
              {"Deadline: " + this.props.projectDeadline}
            </span>
          )}
        </div>
        <div className="contentArea">
          {this.props.createGroupDisplay && <CreateGroup />}
          {this.props.groupsDisplay && (
            <GroupsList
              isTeacher={this.props.isTeacher}
              yourGroupsData={this.props.yourGroupsData}
              openGroupInfo={this.props.openGroupInfo}
            />
          )}
          {this.props.groupInfoDisplay && (
            <GroupInfo
              handleSubmissions={this.props.handleSubmissions}
              handleDuplicates={this.props.handleDuplicates}
              handleApproved={this.props.handleApproved}
              handleAbout={this.props.handleAbout}
              handleViewSubmissions={this.props.handleViewSubmissions}
              handleComments={this.props.handleComments}
              handleAddDetails={this.props.handleAddDetails}
              openGroupInfo={this.props.openGroupInfo}
              submittedDisplay={this.props.submittedDisplay}
              duplicatesDisplay={this.props.duplicatesDisplay}
              approvedDisplay={this.props.approvedDisplay}
              aboutDisplay={this.props.aboutDisplay}
              viewSubmissionDisplay={this.props.viewSubmissionDisplay}
              addDetailsDisplay={this.props.addDetailsDisplay}
              groupData={this.props.groupData}
              teamData={this.props.teamData}
              isTeacher={this.props.isTeacher}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Body;
