import React, { Component } from "react";
import NotifyBell from "../../media/Bell.svg";
import User from "../../media/User.svg";
import Arrow from "../../media/Arrow.svg";
import MagnifyingGlass from "../../media/Magnifying Glass.svg";
import "../../stylesheets/inApp/topbar.css";
import NotificationPanel from "./NotificationPanel";
class Topbar extends React.Component {
  state = {
    name: "",
    notificationPanelDisplay: false,
    inviteUrl: "",
  };
  // handleNotificationDisplay = () => {
  //   let bool = this.state.notificationPanelDisplay;
  //   this.setState({
  //     name: "Sadia Firdous",
  //     notificationPanelDisplay: !bool,
  //   });
  // };
  logoutUser = async () => {
    await fetch(`${process.env.API_URL}/logout`, {
      method: "GET",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => window.open("https://finalize.netlify.app", "_top"))
      .catch((err) => {});
  };
  getUserDetails = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/data`, {
        method: "GET",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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
