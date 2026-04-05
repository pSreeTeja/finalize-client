import React, { Component } from "react";
import Sidebar from "../../components/inApp/Sidebar";
import Topbar from "../../components/inApp/Topbar";
import Body from "../../components/inApp/Body";
import Loading from "../../components/inApp/Loading";
import Toast from "../../components/Toast";
import "../../stylesheets/inApp/dashboard.css";
import { apiAuth, apiGroups, APIError } from "../../utils/api";

class Dashboard extends React.Component {
  state = {
    loadingDisplay: false,
    isTeacher: true,
    groupsActive: true,
    createGroupActive: false,
    groupInfoDisplay: false,
    bodyName: "YOUR GROUPS",
    allGroupsData: [],
    yourGroupsData: [],
    notificationPanelDisplay: false,
    toastVisible: false,
    toastMessage: "",
    toastType: "error",
  };

  async componentDidMount() {
    this.setLoading(true);
    try {
      const [userData, groupsData] = await Promise.all([
        this.getData(),
        this.getGroups(),
      ]);

      this.setState({
        isTeacher: userData.isTeacher,
        yourGroupsData: groupsData || [],
      });

      this.showToast("Data loaded successfully", "success");
    } catch (err) {
      console.error("Failed to load dashboard data:", err);

      if (err instanceof APIError && err.isUnauthorized()) {
        // Redirect to login
        this.props.history.push("/");
      } else {
        this.showToast(
          err.message || "Failed to load dashboard data",
          "error"
        );
      }
    } finally {
      this.setLoading(false);
    }
  }

  getData = async () => {
    try {
      const response = await apiAuth.getUserData();
      if (!response) {
        throw new Error("Failed to fetch user data");
      }
      return response;
    } catch (err) {
      console.error("Error fetching user data:", err);
      throw err;
    }
  };

  getGroups = async () => {
    try {
      const response = await apiGroups.getGroups();
      if (!response) {
        throw new Error("Failed to fetch groups");
      }
      return response;
    } catch (err) {
      console.error("Error fetching groups:", err);
      throw err;
    }
  };

  setLoading = (bool) => {
    this.setState({ loadingDisplay: bool });
  };

  showToast = (message, type = "info") => {
    this.setState({
      toastVisible: true,
      toastMessage: message,
      toastType: type,
    });
  };

  closeToast = () => {
    this.setState({ toastVisible: false });
  };

  handleCreateGroup = () => {
    this.setState({
      bodyName: "Create Group",
      groupsActive: false,
      createGroupActive: true,
    });
  };

  handleGroups = () => {
    window.location.reload();
    this.setState({
      bodyName: "YOUR GROUPS",
      groupsActive: true,
      createGroupActive: false,
      groupInfoDisplay: false,
    });
  };

  handleGroupInfo = (groupName, projectDeadline) => {
    this.setState({
      bodyName: groupName,
      projectDeadline: projectDeadline,
      groupsActive: false,
      createGroupActive: false,
      groupInfoDisplay: true,
    });
  };

  handleSubmissions = () => {
    this.setState({
      submittedDisplay: true,
      duplicatesDisplay: false,
      approvedDisplay: false,
      aboutDisplay: false,
      viewSubmissionDisplay: false,
      addDetailsDisplay: false,
    });
  };

  handleDuplicates = () => {
    this.setState({
      submittedDisplay: false,
      duplicatesDisplay: true,
      approvedDisplay: false,
      aboutDisplay: false,
      viewSubmissionDisplay: false,
      addDetailsDisplay: false,
    });
  };

  handleApproved = () => {
    this.setState({
      submittedDisplay: false,
      duplicatesDisplay: false,
      approvedDisplay: true,
      aboutDisplay: false,
      viewSubmissionDisplay: false,
      addDetailsDisplay: false,
    });
  };

  handleAbout = () => {
    this.setState({
      submittedDisplay: false,
      duplicatesDisplay: false,
      approvedDisplay: false,
      viewSubmissionDisplay: false,
      addDetailsDisplay: false,
      aboutDisplay: true,
    });
  };

  openGroupInfo = (groupData) => {
    this.handleGroupInfo(groupData.projectTitle, groupData.projectDeadline);
    this.setState({
      submittedDisplay: true,
      duplicatesDisplay: false,
      approvedDisplay: false,
      aboutDisplay: false,
      viewSubmissionDisplay: false,
      addDetailsDisplay: false,
      groupData: groupData,
      groupInfoDisplay: true,
    });
  };

  handleViewSubmissions = (data) => {
    this.setState({
      submittedDisplay: false,
      duplicatesDisplay: false,
      approvedDisplay: false,
      viewSubmissionDisplay: true,
      aboutDisplay: false,
      addDetailsDisplay: false,
      teamData: data,
    });
  };

  handleAddDetails = () => {
    this.setState({
      submittedDisplay: false,
      duplicatesDisplay: false,
      approvedDisplay: false,
      viewSubmissionDisplay: false,
      aboutDisplay: false,
      addDetailsDisplay: true,
    });
  };

  setGroupInfoDisplay = (bool, groupName, projectDeadline) => {
    this.setState({
      groupInfoDisplay: bool,
      bodyName: groupName,
      projectDeadline: projectDeadline,
      groupsActive: false,
    });
  };

  render() {
    return (
      <div className="dashboardMainDiv">
        <Sidebar
          handleCreateGroup={this.handleCreateGroup}
          handleGroups={this.handleGroups}
          isTeacher={this.state.isTeacher}
        />
        <div className="contentDiv">
          <div className="topbarDiv">
            <Topbar />
          </div>
          <div className="bodyDiv">
            <Body
              handleGroupInfo={this.handleGroupInfo}
              bodyName={this.state.bodyName}
              projectDeadline={this.state.projectDeadline}
              groupsDisplay={this.state.groupsActive}
              createGroupDisplay={this.state.createGroupActive}
              groupInfoDisplay={this.state.groupInfoDisplay}
              setGroupInfoDisplay={this.setGroupInfoDisplay}
              isTeacher={this.state.isTeacher}
              submittedDisplay={this.state.submittedDisplay}
              duplicatesDisplay={this.state.duplicatesDisplay}
              approvedDisplay={this.state.approvedDisplay}
              aboutDisplay={this.state.aboutDisplay}
              viewSubmissionDisplay={this.state.viewSubmissionDisplay}
              addDetailsDisplay={this.state.addDetailsDisplay}
              groupData={this.state.groupData}
              teamData={this.state.teamData}
              yourGroupsData={this.state.yourGroupsData}
              handleSubmissions={this.handleSubmissions}
              handleDuplicates={this.handleDuplicates}
              handleApproved={this.handleApproved}
              handleAbout={this.handleAbout}
              handleViewSubmissions={this.handleViewSubmissions}
              handleAddDetails={this.handleAddDetails}
              openGroupInfo={this.openGroupInfo}
            />
          </div>
        </div>
        <Toast
          visible={this.state.toastVisible}
          message={this.state.toastMessage}
          type={this.state.toastType}
          onClose={this.closeToast}
        />
        {this.state.loadingDisplay && <Loading />}
      </div>
    );
  }
}

export default Dashboard;
