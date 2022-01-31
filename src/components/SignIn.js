import React, { Component } from "react";
import { Link } from "react-router-dom";
import GoogleLogo from "../media/GoogleLogo.svg";
import FacebookLogo from "../media/FacebookLogo.svg";
import Line from "../media/Line.svg";
import "../stylesheets/signIn.css";
class SignIn extends React.Component {
  state = {
    email: "",
    pass: "",
  };
  render() {
    return (
      <div className="signInMainDiv">
        <input
          className="emailInput"
          placeholder="Email"
          onChange={(e) => {
            this.setState({ email: e.target.value });
          }}
        ></input>
        <input
          className="passwordInput"
          placeholder="Password"
          type="password"
          onChange={(e) => {
            this.setState({ pass: e.target.value });
          }}
        ></input>
        <div className="forgotPasswordDiv">
          <Link className="forgotPasswordLink">Forgot password?</Link>
        </div>
        {/* <Link
          className="signInLink"
          to="/dashboard"
          onClickCapture={() =>
            this.props.setLoginInfo(this.state.email, this.state.pass)
          }        
        >
          <button className="signInButtonInComponent">Sign In</button>
        </Link> */}

        <button
          className="signInButtonInComponent"
          onClick={() =>
            this.props.setLoginInfo(this.state.email, this.state.pass)
          }
        >
          Sign In
        </button>

        {this.props.stat == 401 && (
          <span className="errorMsg">Invalid Details</span>
        )}

        <div className="signInContinueWithDiv">
          <img className="sideLine" src={Line} alt="img" />
          <span className="orContinueWithText">or continue with</span>
          <img className="sideLine" src={Line} alt="img" />
        </div>
        <div className="signInWithMediaDiv">
          <img className="googleLogoSignIn" src={GoogleLogo} alt="img" />
          <img className="facebookLogoSignIn" src={FacebookLogo} alt="img" />
        </div>
      </div>
    );
  }
}

export default SignIn;
