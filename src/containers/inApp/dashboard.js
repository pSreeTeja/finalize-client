import React, { Component } from "react";
import Sidebar from "../../components/inApp/Sidebar";
import Topbar from "../../components/inApp/Topbar";
import Body from "../../components/inApp/Body";
import Loading from "../../components/inApp/Loading";
import "../../stylesheets/inApp/dashboard.css";
class Dashboard extends React.Component {
  userData = {};
  getData = async () => {
    try {
      const res = await fetch(" https://cloudy-handbag-colt.cyclic.app/data", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      // console.log("myData");
      // console.log(data);
      if (!res.status == 200) {
        const err = new Error(res.err);
        throw err;
      }
      return data;
    } catch (err) {
      // console.log(err);
      this.props.history.push("/");
    }
  };
  getGroups = async () => {
    try {
      const res = await fetch(
        " https://cloudy-handbag-colt.cyclic.app/displaygroups",
        {
          method: "GET",

          headers: {
            Accept: "application/json",

            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();

      return data;
    } catch (err) {}
  };
  setLoading = (bool) => {
    this.setState({ loadingDisplay: bool });
  };

  componentDidMount() {
    this.setLoading(true);
    this.getData()
      .then((res) => {
        this.setState({
          isTeacher: res.isTeacher,
        });
      })
      .catch((err) => window.open("https://finalize.netlify.app", "_top"));
    this.getGroups().then((res) => {
      this.setState({
        yourGroupsData: res,
      });
      this.setLoading(false);
    });
  }
  state = {
    //loading
    loadingDisplay: false,
    //from db
    isTeacher: true,
    groupsActive: true,
    createGroupActive: false,
    groupInfoDisplay: false,
    bodyName: "YOUR GROUPS",
    //regarding body
    submittedDisplay: true,
    duplicatesDisplay: false,
    approvedDisplay: false,
    aboutDisplay: false,
    viewSubmissionDisplay: false,
    addDetailsDisplay: false,
    //groupInfo display and data
    // groupData: {},
    teamData: {},
    yourGroupsData: [],
  };
  handleCreateGroup = () => {
    this.setState({
      bodyName: "Create Group",
      groupsActive: false,
      createGroupActive: true,
      submittedDisplay: true,
      duplicatesDisplay: false,
      approvedDisplay: false,
      aboutDisplay: false,
      viewSubmissionDisplay: false,
      groupInfoDisplay: false,
      addDetailsDisplay: false,
      teamData: {},
    });
  };
  handleGroups = () => {
    window.location.reload();
    this.setState({
      bodyName: "YOUR GROUPS",
      groupsActive: true,
      createGroupActive: false,
      groupInfoDisplay: false,
      projectDeadline: "",
    });
  };
  handleGroupInfo = (groupName, projectDeadline) => {
    this.setState({
      bodyName: groupName,
      projectDeadline: projectDeadline,
      groupsActive: false,
      createGroupActive: false,
    });
  };
  setGroupInfoDisplay = (bool, groupName, projectDeadline) => {
    let newState = { ...this.state };
    newState.groupInfoDisplay = bool;
    newState.bodyName = groupName;
    newState.projectDeadline = projectDeadline;
    newState.groupsActive = false;
    this.setState(newState);
  };

  //regarding body
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
    });
    this.setGroupInfoDisplay(
      true,
      groupData.projectTitle,
      groupData.projectDeadline
    );
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
              //groupInfo display and data
              groupData={this.state.groupData}
              teamData={this.state.teamData}
              yourGroupsData={this.state.yourGroupsData}
              handleSubmissions={this.handleSubmissions}
              handleDuplicates={this.handleDuplicates}
              handleApproved={this.handleApproved}
              handleAbout={this.handleAbout}
              handleViewSubmissions={this.handleViewSubmissions}
              handleComments={this.handleComments}
              handleAddDetails={this.handleAddDetails}
              openGroupInfo={this.openGroupInfo}
            />
          </div>
        </div>
        {this.state.loadingDisplay === true && <Loading />}
      </div>
    );
  }
}

export default Dashboard;
