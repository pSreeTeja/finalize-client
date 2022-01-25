import React, { Component } from "react";
import "../../stylesheets/inApp/eachGroupCard.css";
import "../../stylesheets/inApp/cardSettings.css";
import PeopleLogo from "../../media/PeopleLogo.svg";
import DeleteIcon from "../../media/Delete.svg";
import CardSettings from "../../media/CardSettings.svg";

class EachGroupCard extends React.Component {
  state = {
    count: 0,
  };

  // evaluatePeople = () => {
  //   console.log(this.props.groupData.submittedPeople);
  //   let len = this.props.groupData.submittedPeople.length;
  //   if (len > 2) {
  //     this.state.count = len - 2;
  //   }
  // };
  deleteGroup = async (_id) => {
    const response = await fetch("https://finalize.herokuapp.com/deletegroup", {
      method: "POST",

      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
      }),
    }).then((res) => {
      if (res == 200) {
        window.open("https://finalize.netlify.app/dashboard", "_top");
      }
      // console.log("CLIENT: DELTED ");
    });
  };

  render() {
    // this.evaluatePeople();
    return (
      <div
        className="groupDiv"
        onClick={() => {
          // console.log("inEachGroupInfo");
          // console.log(this.props.groupData);
          this.props.openGroupInfo(this.props.groupData);
        }}
      >
        <div className="projectDetails">
          <span className="projectName">
            {this.props.groupData.projectTitle}
          </span>
          <span className="aboutTheProject">
            {this.props.groupData.aboutProject}
          </span>
        </div>
        <div className="projectStatsDiv">
          <img className="peopleIconFirst" src={PeopleLogo} alt="img" />
          <img className="peopleIconSecond" src={PeopleLogo} alt="img" />
          <span>{this.state.count + "+"}</span>
        </div>
        {this.props.isTeacher && (
          <div className="cardSettingDiv">
            <button>
              <img
                className="deleteicon"
                src={DeleteIcon}
                alt="img"
                onClick={() => {
                  var r = window.confirm(
                    `Are you sure you want delete ${this.props.groupData.projectTitle} ?`
                  );
                  if (r == true) {
                    this.deleteGroup(this.props.groupData._id);
                  }
                }}
              />
            </button>

            <img className="cardSettingsIcon" src={CardSettings} alt="img" />
          </div>
        )}
      </div>
    );
  }
}

export default EachGroupCard;
