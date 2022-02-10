import React, { Component } from "react";
import Logo from "../media/Logo.svg";
import "../stylesheets/help.css";
class Help extends Component {
  state = {};
  render() {
    return (
      <div className="helpPageMainDiv">
        <div className="topHelpDiv">
          <img className="helpPageLogo" src={Logo} alt="img" />
        </div>
        <div className="bottomHelpDiv">
          <ul className="infoList">
            <li>
              Our Finalize App is a Utility app aimed especially at teachers and
              students.
            </li>
            <li>
              Here teachers will be creating groups for targeted people for
              purpose of projects and on creation of groups, an invite link is
              generated and students concerned will be joining through the link.
            </li>
            <li>
              After joining the group, students need to enter their project
              titles and submit the same. After submission, the teacher will be
              evaluating all titles and approve or decline them based on the
              requirement.
            </li>
            <li>
              If the project title is accepted or declined, mail is sent
              accordingly to the students. Students can start working on
              accepted projects and submit their work once completed.
            </li>
            <li>
              This web application allows the teacher to administer and manage
              projects efficiently and eliminates tedious task of conducting
              online meet to inform them induvidually.
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Help;
