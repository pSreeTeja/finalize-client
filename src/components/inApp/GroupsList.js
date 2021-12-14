import React, { Component } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";

import EachGroupCard from "./EachGroupCard";
import "../../stylesheets/inApp/groupsList.css";
class GroupsList extends React.Component {
  render() {
    return (
      <div className="groupsListMainDiv">
        {this.props.yourGroupsData.map((groupData) => {
          return (
            <EachGroupCard
              key={this.props.yourGroupsData.indexOf(groupData)}
              groupData={groupData}
              openGroupInfo={this.props.openGroupInfo}
              isTeacher={this.props.isTeacher}
            />
          );
        })}
      </div>
    );
  }
}

export default GroupsList;
