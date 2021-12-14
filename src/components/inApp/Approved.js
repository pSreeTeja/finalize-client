import React, { Component } from "react";
import WhiteTick from "../../media/WhiteTick.svg";
import LoadingWhite from "../../media/LoadingWhite.svg";
import "../../stylesheets/inApp/approved.css";
class Approved extends React.Component {
  render() {
    return (
      <div className="approvedMainDiv">
        {this.props.Data.map((data) => {
          return (
            data.isApproved && (
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

                  <div className="options">
                    <div
                      className={
                        data.completed ? "green buttonDiv" : "blue buttonDiv"
                      }
                    >
                      <img
                        className="statusLogo"
                        src={data.completed ? WhiteTick : LoadingWhite}
                        alt="img"
                      />
                      <button
                        className={
                          data.completed ? "green button" : "blue button"
                        }
                      >
                        {data.completed ? "Completed" : "In Progress"}
                      </button>
                    </div>

                    {data.completed && (
                      <div className="commentDiv">
                        <button
                          className="commentButton"
                          onClick={() => {
                            this.props.handleViewSubmissions(data);
                          }}
                        >
                          {"View Submission"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          );
        })}
      </div>
    );
  }
}

export default Approved;
