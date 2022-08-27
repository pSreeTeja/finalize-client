import React, { Component } from "react";
import "../stylesheets/landingPage.css";
import CookieConsent from "react-cookie-consent";
import Logo from "../media/Logo.svg";
import LandingPageImage from "../media/LandingPageImage.svg";
import Loading from "../components/inApp/Loading";
import Register from "../components/Register";
import SignIn from "../components/SignIn";

class LandingPage extends React.Component {
  state = {
    loadingDisplay: false,
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
    const response = await fetch("https://finalize.herokuapp.com/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.pass,
      }),
    }).then((res) => {
      if (res.status == 401) {
        // console.log("UNAUTHORIZED");
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
  setLoading = (bool) => {
    this.setState({ loadingDisplay: bool });
  };
  registerUser = () => {
    this.setLoading(true);
    const response = fetch("https://finalize.herokuapp.com/register", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.pass,
        isTeacher: this.state.isTeacher,
      }),
    }).then((res) => {
      if (res.status == 201) {
        window.open("https://finalize.netlify.app", "_top");
        this.setLoading(false);
      }
    });
  };
  setRegisterInfo = (name, email, pass, isTeacher) => {
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
  componentDidMount = async () => {
    const response = await fetch(
      "https://finalize.herokuapp.com/isAuthenticated",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.status == 200) {
        window.open("https://finalize.netlify.app/dashboard", "_top");
      }
    });
  };

  render() {
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
            <span className="appEmail">support.finalize@gmail.com</span>
          </div>
        </div>
        <CookieConsent
          debug={true}
          style={{ textAlign: "center", transitionTime: "0.5" }}
          buttonText="I Agree"
          buttonStyle={{
            fontSize: "16px",
            backgroundColor: "#4561f1",
            color: "white",
          }}
        >
          Our site uses cookies to provide the best user experience.
          <a
            href="https://www.websitepolicies.com/policies/view/bwrZtBy7"
            target="_blank"
            style={{ color: "white" }}
          >
            Our Cookie Policy
          </a>
        </CookieConsent>
        {this.state.loadingDisplay && <Loading />}
      </div>
    );
  }
}

export default LandingPage;
