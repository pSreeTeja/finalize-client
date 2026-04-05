import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../stylesheets/inApp/createGroup.css";
import Toast from "../Toast";
import { apiGroups, APIError } from "../../utils/api";

class CreateGroup extends React.Component {
  state = {
    projectTitle: "",
    aboutProject: "",
    date: "",
    link: "http://bit.ly/245cK",
    isLoading: false,
    toastVisible: false,
    toastMessage: "",
    toastType: "error",
  };

  createNewGroup = async () => {
    // Validation
    if (!this.state.projectTitle.trim()) {
      this.showToast("Project title is required", "warning");
      return;
    }

    if (!this.state.aboutProject.trim()) {
      this.showToast("Project description is required", "warning");
      return;
    }

    if (!this.state.date) {
      this.showToast("Project deadline is required", "warning");
      return;
    }

    this.setState({ isLoading: true });

    try {
      const response = await apiGroups.createGroup(
        this.state.projectTitle,
        this.state.aboutProject,
        this.state.date,
        this.state.link
      );

      this.showToast("Group created successfully!", "success");
      
      // Reset form
      this.setState({
        projectTitle: "",
        aboutProject: "",
        date: "",
        link: "http://bit.ly/245cK",
      });

      // Reload page or navigate back to groups
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      if (err instanceof APIError) {
        this.showToast(
          err.message || "Failed to create group",
          "error"
        );
      } else {
        this.showToast("An unexpected error occurred", "error");
      }
    } finally {
      this.setState({ isLoading: false });
    }
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

  render() {
    return (
      <div>
        <div className="projectTitleDv">
          <span className="ProjectTitle">Project Title :</span>
          <input
            className="projectField"
            value={this.state.projectTitle}
            onChange={(e) => {
              this.setState({ projectTitle: e.target.value });
            }}
            placeholder="Enter project title"
          />
        </div>
        <div className="titleDiv">
          <span className="AboutTitle">About Project :</span>
          <textarea
            columns="50"
            rows="10"
            className="aboutField"
            value={this.state.aboutProject}
            onChange={(e) => {
              this.setState({ aboutProject: e.target.value });
            }}
            placeholder="Enter project description"
          />
        </div>
        <div className="projectDiv">
          <span className="projectDeadine">Project Deadline: </span>
          <input
            className="projectDeadineField"
            type="datetime-local"
            value={this.state.date}
            onChange={(e) => {
              this.setState({ date: e.target.value });
            }}
          />
        </div>

        <div className="saveButtonDiv">
          <button 
            className="saveButton" 
            onClick={this.createNewGroup}
            disabled={this.state.isLoading}
          >
            {this.state.isLoading ? "Saving..." : "Save"}
          </button>
        </div>
        
        <Toast
          visible={this.state.toastVisible}
          message={this.state.toastMessage}
          type={this.state.toastType}
          onClose={this.closeToast}
        />
      </div>
    );
  }
}

export default CreateGroup;
