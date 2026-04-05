import React, { Component } from "react";
import User from "../../media/User.svg";
import "../../stylesheets/inApp/topbar.css";
import Toast from "../Toast";
import { apiAuth, apiGroups, APIError } from "../../utils/api";

class Topbar extends React.Component {
  state = {
    name: "",
    notificationPanelDisplay: false,
    inviteUrl: "",
    toastVisible: false,
    toastMessage: "",
    toastType: "error",
  };

  logoutUser = async () => {
    try {
      await apiAuth.logout();
      this.showToast("Logged out successfully", "success");
      
      // Clear localStorage
      localStorage.clear();
      sessionStorage.clear();
      
      // Redirect to login
      setTimeout(() => {
        this.props.history.push("/");
      }, 1000);
    } catch (err) {
      console.error("Logout error:", err);
      // Still redirect even if logout fails on backend
      localStorage.clear();
      sessionStorage.clear();
      this.props.history.push("/");
    }
  };

  getUserDetails = async () => {
    try {
      const response = await apiAuth.getUserData();
      if (!response) {
        throw new Error("Failed to fetch user details");
      }
      return response;
    } catch (err) {
      console.error("Error fetching user details:", err);
      throw err;
    }
  };

  componentDidMount = async () => {
    try {
      const userData = await this.getUserDetails();
      this.setState({ name: userData.name || "User" });
    } catch (err) {
      console.error("Failed to load user details", err);
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
  sendToInviteLink = () => {
    window.location = this.state.inviteUrl;
  };
  componentDidMount() {
    this.getUserDetails().then((res) => this.setState({ name: res.name }));
  }
  render() {
    return (
      <div className="topDiv">
        <div className="searchWithArrowDiv">
          <div className="searchBoxDiv">
            <input
              className="searchBar"
              placeholder="Have group link?"
              type="url"
              onChange={(e) => {
                this.setState({ inviteUrl: e.target.value });
              }}
            ></input>
          </div>
          <button
            className="joinButton"
            onClick={() => this.sendToInviteLink()}
          >
            Join
          </button>
        </div>
        <div className="iconsDiv">
          {/* <img
            className={
              this.state.notificationPanelDisplay
                ? "notification notificationActive"
                : "notification"
            }
            src={NotifyBell}
            alt="img"
            onClick={this.handleNotificationDisplay}
          />
          <div className="notificationPanelComponent">
            {this.state.notificationPanelDisplay && <NotificationPanel />}
          </div> */}

          <img className="profilePhoto" src={User} alt="img" />
          <span className="nameText">{this.state.name}</span>
          <button className="logoutButton" onClick={() => this.logoutUser()}>
            <span className="logoutText">Log Out</span>
          </button>
        </div>
      </div>
    );
  }
}

export default Topbar;
