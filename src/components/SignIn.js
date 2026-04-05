import React, { Component } from "react";
import GoogleLogo from "../media/GoogleLogo.svg";
import FacebookLogo from "../media/FacebookLogo.svg";
import Line from "../media/Line.svg";
import "../stylesheets/signIn.css";

class SignIn extends React.Component {
  render() {
    const { emailRef, passwordRef, setLoginInfo } = this.props;

    return (
      <div className="signInMainDiv">
        <input
          ref={emailRef}
          className="emailInput"
          placeholder="Email"
          type="email"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              const password = passwordRef?.current?.value;
              const email = emailRef?.current?.value;
              setLoginInfo(email, password);
            }
          }}
        />
        <input
          ref={passwordRef}
          className="passwordInput"
          placeholder="Password"
          type="password"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              const password = passwordRef?.current?.value;
              const email = emailRef?.current?.value;
              setLoginInfo(email, password);
            }
          }}
        />
        <button
          className="signInButtonInComponent"
          onClick={() => {
            const password = passwordRef?.current?.value;
            const email = emailRef?.current?.value;
            setLoginInfo(email, password);
          }}
        >
          Sign In
        </button>
        <div className="signInSocialDiv">
          <img className="socialLogo" src={FacebookLogo} alt="Facebook" />
          <img className="socialLogo" src={GoogleLogo} alt="Google" />
        </div>
        <div className="lineAndTextDiv">
          <img src={Line} alt="line" className="sideLine" />
          <span className="orText">OR</span>
          <img src={Line} alt="line" className="sideLine" />
        </div>
      </div>
    );
  }
}

export default SignIn;

