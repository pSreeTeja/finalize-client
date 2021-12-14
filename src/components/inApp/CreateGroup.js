import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../stylesheets/inApp/createGroup.css";
class CreateGroup extends React.Component {
  state = {
    projectTitle: "",
    aboutProject: "",
    date: "",
    link: "http://bit.ly/245cK",
  };
  createNewGroup = async () => {
    const p = await fetch("/creategroupapi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        projectTitle: this.state.projectTitle,
        aboutProject: this.state.aboutProject,
        date: this.state.date,
        link: this.state.link,
      }),
    }).then(window.open("https://finalize.netlify.app/dashboard", "_top"));
    const data = await p.json();
    // console.log(data);
  };

  render() {
    return (
      <div>
        <div className="projectTitleDv">
          <span className="ProjectTitle">Project Title :</span>
          <input
            className="projectField"
            onChange={(e) => {
              this.setState({ projectTitle: e.target.value });
            }}
          ></input>
        </div>
        <div className="titleDiv">
          <span className="AboutTitle">About Project :</span>
          <textarea
            columns="50"
            rows="10"
            className="aboutField"
            onChange={(e) => {
              this.setState({ aboutProject: e.target.value });
            }}
          ></textarea>
        </div>
        <div className="projectDiv">
          <span className="projectDeadine">Project Deadline: </span>
          <input
            className="projectDeadineField"
            type="datetime-local"
            onChange={(e) => {
              this.setState({ date: e.target.value });
            }}
          ></input>
        </div>

        <div className="saveButtonDiv">
          <button className="saveButton" onClick={this.createNewGroup}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default CreateGroup;
