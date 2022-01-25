import React, { Component } from "react";
import "../../stylesheets/inApp/submittedAndDuplicates.css";
import GreenTick from "../../media/GreenTick.svg";
import Cross from "../../media/Cross.svg";
class SubmittedAndDuplicates extends React.Component {
  approveProject = async (data) => {
    // console.log("DATA FROM ACCEPT CLICK");
    // console.log(data);
    const p = await fetch(
      "https://finalize.herokuapp.com/updatestudentproject",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          _id: this.props.groupData._id, //because to add into that particular group
          email: data.email,
          projectTitle: data.projectTitle,
          abstract: data.abstract,
          teamMem1: data.teamMem1,
          teamMem2: data.teamMem2,
          teamMem3: data.teamMem3,
          teamMem4: data.teamMem4,
          projectLink: data.projectLink,
          didAdd: true,
          isApproved: false,
          completed: false,
          isEditDetails: false,
        }),
      }
    ).then((res) => {
      if (res.status == 200) {
        window.open("https://finalize.netlify.app/dashboard", "_top");
      }
    });
  };
  rejectProject = async (data) => {
    const p = await fetch("https://finalize.herokuapp.com/rejectproject", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        _id: this.props.groupData._id, //because to add into that particular group
        email: data.email,
        projectTitle: data.projectTitle,
        abstract: data.abstract,
        teamMem1: data.teamMem1,
        teamMem2: data.teamMem2,
        teamMem3: data.teamMem3,
        teamMem4: data.teamMem4,
        projectLink: data.projectLink,
        didAdd: true,
        isApproved: false,
        completed: false,
        isEditDetails: false,
      }),
    }).then((res) => {
      if (res.status == 200) {
        window.open("https://finalize.netlify.app/dashboard", "_top");
      }
    });
  };
  render() {
    return (
      <div className="submittedAndDuplicatesMainDiv">
        {this.props.Data.map((data) => {
          // console.log("DATA IS APPROVED");
          // console.log(data.isApproved);
          return (
            !this.props.flag &&
            !data.isApproved && (
              <div className="listProjects" key={this.props.Data.indexOf(data)}>
                <div className="leftDiv">
                  <div className="projectNameDiv">
                    <span className="projectTitle">{data.projectTitle}</span>
                  </div>
                </div>
                <div className="rightDiv">
                  <div className="rollNumbersDiv">
                    <span className="rollnumbers">{data.teamMem1 + "\n"}</span>
                    <span className="rollnumbers">{data.teamMem2 + "\n"}</span>
                    <span className="rollnumbers">{data.teamMem3 + "\n"}</span>
                    <span className="rollnumbers">{data.teamMem4 + "\n"}</span>
                  </div>
                  <div className="abstractDiv">
                    <span>{data.abstract}</span>
                  </div>

                  {this.props.isTeacher && (
                    <div className="options">
                      <div className="acceptDiv">
                        <img
                          className="greenTickLogo"
                          src={GreenTick}
                          alt="img"
                        />
                        <button
                          className="accept"
                          onClick={() => this.approveProject(data)}
                        >
                          Accept
                        </button>
                      </div>

                      <div className="declineDiv">
                        <img className="CrossLogo" src={Cross} alt="img" />
                        <button
                          className="decline"
                          onClick={() => this.rejectProject(data)}
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          );
        })}
      </div>
    );
  }
}

export default SubmittedAndDuplicates;
