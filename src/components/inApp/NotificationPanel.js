import React, { Component } from "react";
import "../../stylesheets/inApp/notificationPanel.css";
class NotificationPanel extends React.Component {
  state = {};
  notifications = [
    "Project has been submitted by x people in the xyz group on date",
    "Project has been submitted by x people in the xyz group on date",
    "Project has been submitted by x people in the xyz group on date",
    "Project has been submitted by x people in the xyz group on date",
    "Project has been submitted by x people in the xyz group on date",
    "Project has been submitted by x people in the xyz group on date",
    "Project has been submitted by x people in the xyz group on date",
    "Project has been submitted by x people in the xyz group on date",
  ];
  render() {
    return (
      <div className="notificationPanelMainDiv">
        <div className="markAllReadButtonDiv">
          <button className="markAllReadButton">Mark all as read</button>
        </div>

        {this.notifications.map((notification) => {
          return (
            <div
              className={"eachNotificationDiv"}
              key={this.notifications.indexOf(notification)}
            >
              <span>{notification}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default NotificationPanel;
