import React, { Component } from "react";
import Line from "../media/Line.svg";
import GoogleLogo from "../media/GoogleLogo.svg";
import FacebookLogo from "../media/FacebookLogo.svg";
import "../stylesheets/register.css";
import validator from "validator";
class Register extends React.Component {
  state = {
    name: "",
    email: "",
    pass: "",
    role: "",
    isTeacher: false,
    errMsg: "",
  };
  verifyPass = () => {
    // console.log("inVerifyPass");
    if (this.state.pass != this.state.re_pass) {
      // console.log("Not equal");
      this.setState({ errMsg: "Please provide valid details" });
    } else {
      if (this.state.role == "Teacher") {
        this.setState({ isTeacher: true }, () => {
          // console.log("sending info to landingPage");
          this.props.setRegisterInfo(
            this.state.name,
            this.state.email,
            this.state.pass,
            this.state.isTeacher
          );
        });
      } else {
        this.setState({ isTeacher: false }, () => {
          // console.log("sending info to landingPage");
          this.props.setRegisterInfo(
            this.state.name,
            this.state.email,
            this.state.pass,
            this.state.isTeacher
          );
        });
      }
    }
  };
  render() {
    return (
      <div className="registerMainDiv">
        <div className="studentOrTeacherSelectDiv">
          <form>
            <select
              name="Role"
              className="selectFormRegister"
              onChange={(e) => {
                this.setState({ role: e.target.value });
              }}
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
          </form>
        </div>
        <input
          className="nameInput"
          placeholder="Name"
          onChange={(e) => {
            this.setState({ name: e.target.value });
          }}
        ></input>

        <input
          className="emailInput"
          placeholder="Email"
          onChange={(e) => {
            this.setState({ email: e.target.value });
          }}
        ></input>
        <input
          type="password"
          className="passwordInput"
          placeholder="Password"
          onChange={(e) => {
            this.setState({ pass: e.target.value });
          }}
        ></input>
        <input
          type="password"
          className="confirmPasswordInput"
          placeholder="Confirm Password"
          onChange={(e) => {
            this.setState({ re_pass: e.target.value });
          }}
        ></input>
        <button className="registerInButtonComponent" onClick={this.verifyPass}>
          Register
        </button>
        <span className="errorMsg">{this.state.errMsg}</span>
        <div className="registerOrContinueWithDiv">
          <img src={Line} alt="img" />
          <span className="orContinueWithText">or continue with</span>
          <img src={Line} alt="img" />
        </div>
        <div className="registerWithSocials">
          <img className="googleLogoRegister" src={GoogleLogo} alt="img" />
          <img className="facebookLogoRegister" src={FacebookLogo} alt="img" />
        </div>
      </div>
    );
  }
}
export default Register;
