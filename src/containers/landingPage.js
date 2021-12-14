import React, { Component } from "react";
import "../stylesheets/landingPage.css";
import Logo from "../media/Logo.svg";
import LandingPageImage from "../media/LandingPageImage.svg";
import FacebookLogo from "../media/FacebookLogo.svg";
import TwitterLogo from "../media/TwitterLogo.svg";
import WhatsappLogo from "../media/WhatsappLogo.svg";
import Register from "../components/Register";
import SignIn from "../components/SignIn";

class LandingPage extends React.Component {
  state = {
    signInDisplay: true,
    registerDisplay: false,
    name: "",
    email: "",
    pass: "",
    re_pass: "",
    isTeacher: false,
    stat: 200,
  };
  handleSignin = () => {
    this.setState({ signInDisplay: true, registerDisplay: false });
  };
  handleRegister = () => {
    this.setState({ signInDisplay: false, registerDisplay: true });
  };
  loginUser = async () => {
    const response = await fetch(` https://finalize.herokuapp.com/login`, {
      method: "POST",

      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.pass,
      }),
    }).then((res) => {
      if (res.status == 401) {
        console.log("UNAUTHORIZED");
        this.setState({ stat: 401 });
      } else {
        window.open("https://finalize.netlify.app/dashboard", "_top");
      }
    });
  };
  setLoginInfo = (email, pass) => {
    this.setState(
      {
        email: email,
        pass: pass,
      },
      () => this.loginUser()
    );
  };
  registerUser = () => {
    const response = fetch(` https://finalize.herokuapp.com/register`, {
      method: "POST",

      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.pass,
        isTeacher: this.state.isTeacher,
      }),
    }).then(window.open("https://finalize.netlify.app", "_top"));
    // const data = response.json();
    // console.log(data);
  };
  setRegisterInfo = (name, email, pass, isTeacher) => {
    // console.log(email + pass + isTeacher);
    this.setState(
      {
        name: name,
        email: email,
        pass: pass,
        isTeacher: isTeacher,
      },
      () => this.registerUser()
    );
  };

  render() {
    // console.log(this.state);
    return (
      <div className="mainDiv">
        <div className="header">
          <div className="logoAndAppNameDiv">
            <img className="logo" src={Logo} alt="img" />
            <p className="appName">Finalize</p>
          </div>
          <div className="headerButtonsDiv">
            <div className="signInButtonDiv">
              <button
                className={
                  this.state.signInDisplay
                    ? "signInButton headerButton"
                    : "signInButton headerButton signInInactive"
                }
                onClick={this.handleSignin}
              >
                Sign In
              </button>
              <div
                className={
                  this.state.signInDisplay
                    ? "borderBottom"
                    : "borderBottom borderInactive"
                }
              ></div>
            </div>
            <button
              className={
                this.state.registerDisplay
                  ? "registerButton headerButton registerActive"
                  : "registerButton headerButton"
              }
              onClick={this.handleRegister}
            >
              Register
            </button>
          </div>
        </div>
        <div className="landingPageBodyDiv">
          <div className="landingPageImageDiv">
            <span className="landingPageText">
              Administer and Manage Projects Efficiently
            </span>
            <img
              src={LandingPageImage}
              className="landingPageImage"
              alt="img"
            />
          </div>
          <div className="signInRegisterContainerDiv">
            {this.state.registerDisplay && (
              <Register setRegisterInfo={this.setRegisterInfo} />
            )}
            {this.state.signInDisplay && (
              <SignIn setLoginInfo={this.setLoginInfo} stat={this.state.stat} />
            )}
          </div>
        </div>
        <div className="footer">
          <div className="footerLogoDiv">
            <img className="logoFooter" src={Logo} alt="img" />
            <div className="appNameAndTaglineDiv">
              <span className="appNameFooter">Finalize</span>
              <span className="taglineFooter">
                Handling projects made simpler.
              </span>
            </div>
          </div>
          <div className="contactFooterDiv">
            <span className="contactHeadingFooter">Contact :</span>
            <span>support.finalize@gmail.com</span>
            <div className="contactMediaLogosDiv">
              <img className="contactMediaLogo" src={FacebookLogo} alt="img" />
              <img className="contactMediaLogo" src={TwitterLogo} alt="img" />
              <img className="contactMediaLogo" src={WhatsappLogo} alt="img" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
