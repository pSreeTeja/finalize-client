import React, { Component } from "react";
import Logo from "../../media/Logo.svg";
import Activity from "../../media/Activity.svg";
import Groups from "../../media/Groups.svg";
import Announcements from "../../media/Announcements.svg";
import Help from "../../media/Help.svg";
import Settings from "../../media/Settings.svg";
import LineUnderActivity from "../../media/LineUnderActivity.svg";
import "../../stylesheets/inApp/sidebar.css";
class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebarMainDiv">
        <div className="sidebarTopDiv">
          <div className="inApplogoAndNameDiv">
            <img className="inAppLogo" src={Logo} alt="img" />
            <div className="inAppNameDiv">
              <span className="appNameText">Finalize</span>
              <span className="workspaceText">Workspace</span>
            </div>
          </div>
          {/* <div className="topDivSidebarSection activitySection">
            <img className="sectionLogo" src={Activity} alt="img" />
            <span className="sectionName">Activity</span>
          </div> */}
          <div className="lineUnderActivityDiv">
            <img src={LineUnderActivity} />
          </div>
          <div className="topDivSidebarSection">
            <img className="sectionLogo" src={Groups} alt="img" />
            <span className="sectionName" onClick={this.props.handleGroups}>
              Groups
            </span>
          </div>
          {/* {this.props.isTeacher && (
            <div className="topDivSidebarSection">
              <img className="sectionLogo" src={Announcements} alt="img" />
              <span className="sectionName">Announcements</span>
            </div>
          )} */}
        </div>

        <div className="sidebarBottomDiv">
          {this.props.isTeacher && (
            <button
              className="createNewButton"
              onClick={this.props.handleCreateGroup}
            >
              + Create group
            </button>
          )}

          <div className="bottomDivSidebarSection">
            <Link to="/help" className="helpLink">
              <img className="sectionLogo" src={Help} alt="img" />
              <span className="sectionName helpText">Help</span>
            </Link>
          </div>
          {/* <div className="bottomDivSidebarSection settingsSection">
            <img className="sectionLogo" src={Settings} alt="img" />
            <span className="sectionName">Settings</span>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Sidebar;
