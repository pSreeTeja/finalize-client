import React, { Component } from "react";
import SubmittedAndDuplicates from "./SubmittedAndDuplicates";
import "../../stylesheets/inApp/groupInfo.css";
import Approved from "./Approved";
import About from "./About";
import ViewSubmissions from "./ViewSubmissions";
import AddDetails from "./AddDetails";
class GroupInfo extends React.Component {
  computeApprovedData = () => {};

  state = {
    didAdd: false,
    userDetails: {},
    myTeamDetails: {}, //details of the users team project
  };
  getUserDetails = async () => {
    try {
      const res = await fetch(` https://finalize.herokuapp.com/data`, {
        method: "GET",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true,
        },
        credentials: "include",
      });
      const data = await res.json();
      // console.log("CURRENT USER DETAILS");
      // console.log(data);
      return data;
    } catch (err) {
      // console.log(err);
    }
  };
  componentDidMount() {
    this.getUserDetails()
      .then((res) => {
        this.setState({
          userDetails: res,
        });
      })
      .then(() => {
        for (var i = 0; i < this.props.groupData.submittedData.length; i++) {
          // console.log("LOOP");
          if (
            this.props.groupData.submittedData[i].email ===
            this.state.userDetails.email
          ) {
            this.setState({
              myTeamDetails: this.props.groupData.submittedData[i],
            });
          }
        }
        // console.log("MY TEAM DETAILS IN CDM");
        // console.log(this.state.myTeamDetails);
      });
  }

  render() {
    // console.log(this.props.isTeacher);
    // console.log("in groupInfo");
    // console.log(this.props.groupData);
    return (
      <div className="GroupInfoMainDiv">
        <div className="sectionsDiv">
          <div className="leftSection">
            <button
              onClick={this.props.handleSubmissions}
              className={
                this.props.submittedDisplay ? "submitted active" : "submitted"
              }
            >
              {"Submitted"}
            </button>
            {/* <button
              onClick={this.props.handleDuplicates}
              className={
                this.props.duplicatesDisplay ? "duplicates active" : "submitted"
              }
            >
              {"Duplicates"}
            </button> */}

            <button
              onClick={this.props.handleApproved}
              className={
                this.props.approvedDisplay ? "approved active" : "approved"
              }
            >
              {"Approved"}
            </button>

            <button
              onClick={this.props.handleAbout}
              className={this.props.aboutDisplay ? "about active" : "about"}
            >
              About
            </button>
          </div>
          {!this.props.isTeacher && (
            <div className="rightButtonDiv">
              <button
                className={
                  this.props.addDetailsDisplay
                    ? "addDetailsButton active"
                    : "addDetailsButton"
                }
                onClick={this.props.handleAddDetails}
              >
                {this.state.myTeamDetails.didAdd
                  ? "Edit details"
                  : "Add details"}
              </button>
            </div>
          )}
        </div>
        <div className="listDiv">
          {/* {this.props.duplicatesDisplay && this.props.isTeacher && (
            <div className="notifyButtonDiv">
              <button className="notifyAllButton">Notify All</button>
            </div>
          )} */}

          {/* {this.props.duplicatesDisplay && (
            <SubmittedAndDuplicates
              isTeacher={this.props.isTeacher}
              //send duplicates data afterwards

              Data={this.props.groupData.submittedData}
            />
          )} */}
          {this.props.submittedDisplay && (
            <SubmittedAndDuplicates
              isTeacher={this.props.isTeacher}
              flag={false}
              groupData={this.props.groupData}
              Data={this.props.groupData.submittedData}
            />
          )}

          {this.props.approvedDisplay && (
            <Approved
              isTeacher={this.props.isTeacher}
              Data={this.props.groupData.submittedData}
              flag={true}
              handleViewSubmissions={this.props.handleViewSubmissions}
            />
          )}
          {this.props.aboutDisplay && (
            <About
              groupData={this.props.groupData}
              isTeacher={this.props.isTeacher}
            />
          )}
          {this.props.viewSubmissionDisplay && (
            <ViewSubmissions teamData={this.props.teamData} />
          )}
          {this.props.addDetailsDisplay && (
            <AddDetails
              groupData={this.props.groupData}
              myTeamDetails={this.state.myTeamDetails}
            />
          )}
        </div>
      </div>
    );
  }
}

export default GroupInfo;
