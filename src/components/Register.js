import React, { Component } from "react";
import Line from "../media/Line.svg";
import GoogleLogo from "../media/GoogleLogo.svg";
import FacebookLogo from "../media/FacebookLogo.svg";
import "../stylesheets/register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.roleRef = React.createRef();
    this.confirmPasswordRef = React.createRef();
  }

  verifyPass = () => {
    const { registerNameRef, registerEmailRef, registerPasswordRef, setRegisterInfo } = this.props;
    const role = this.roleRef?.current?.value;
    const confirmPassword = this.confirmPasswordRef?.current?.value;
    const password = registerPasswordRef?.current?.value;

    if (password !== confirmPassword) {
      // Error message will be handled by parent
      return;
    }

    const name = registerNameRef?.current?.value;
    const email = registerEmailRef?.current?.value;
    const isTeacher = role === "Teacher";

    setRegisterInfo(name, email, password, isTeacher);
  };

  render() {
    const { registerNameRef, registerEmailRef, registerPasswordRef } = this.props;

    return (
      <div className="registerMainDiv">
        <div className="studentOrTeacherSelectDiv">
          <form>
            <select
              ref={this.roleRef}
              name="Role"
              className="selectFormRegister"
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
          </form>
        </div>
        <input
          ref={registerNameRef}
          className="nameInput"
          placeholder="Name"
          type="text"
        />

        <input
          ref={registerEmailRef}
          className="emailInput"
          placeholder="Email"
          type="email"
        />
        <input
          ref={registerPasswordRef}
          type="password"
          className="passwordInput"
          placeholder="Password"
        />
        <input
          ref={this.confirmPasswordRef}
          type="password"
          className="confirmPasswordInput"
          placeholder="Confirm Password"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              this.verifyPass();
            }
          }}
        />
        <button className="registerInButtonComponent" onClick={this.verifyPass}>
          Register
        </button>
        <div className="registerOrContinueWithDiv">
          <img className="sideLine" src={Line} alt="img" />
          <span className="orContinueWithText">or continue with</span>
          <img className="sideLine" src={Line} alt="img" />
        </div>
        <div className="registerWithSocials">
          <img className="googleLogoRegister" src={GoogleLogo} alt="img" />
        </div>
      </div>
    );
  }
}
export default Register;
