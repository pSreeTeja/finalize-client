import React, { Component } from "react";
import "../../stylesheets/invite.css";
import Logo from "../../media/Logo.svg";
class InvitePage extends React.Component {
  addMeToGroup = async () => {
    const response = await fetch("https://finalize.herokuapp.com/invite", {
      method: "POST",

      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: this.props.match.params.groupid,
      }),
    }).then((res) =>
      window.open("https://finalize.netlify.app/dashboard", "_top")
    );
  };
  render() {
    return (
      <div className="inviteTopDiv">
        <div className="inviteApplogoAndNameDiv">
          <img className="inviteAppLogo" src={Logo} alt="img" />
          <div className="inviteAppNameDiv">
            <span className="appNameText">Finalize</span>
            <span className="workspaceText">Workspace</span>
          </div>
        </div>

        <div className="invitePageMainDiv">
          <button className="inviteButton" onClick={() => this.addMeToGroup()}>
            Accept Invite
          </button>
        </div>
      </div>
    );
  }
}

export default InvitePage;
