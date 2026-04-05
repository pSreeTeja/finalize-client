import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../stylesheets/landingPage.css";
import CookieConsent from "react-cookie-consent";
import Logo from "../media/Logo.svg";
import LandingPageImage from "../media/LandingPageImage.svg";
import Loading from "../components/inApp/Loading";
import Register from "../components/Register";
import SignIn from "../components/SignIn";
import Toast from "../components/Toast";
import { apiAuth, APIError } from "../utils/api";

class LandingPage extends React.Component {
  state = {
    loadingDisplay: false,
    signInDisplay: true,
    registerDisplay: false,
    name: "",
    email: "",
    re_pass: "",
    isTeacher: false,
    toastVisible: false,
    toastMessage: "",
    toastType: "error",
  };

  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.registerEmailRef = React.createRef();
    this.registerPasswordRef = React.createRef();
    this.registerNameRef = React.createRef();
  }

  handleSignin = () => {
    this.setState({ signInDisplay: true, registerDisplay: false });
  };

  handleRegister = () => {
    this.setState({ signInDisplay: false, registerDisplay: true });
  };

  loginUser = async () => {
    const email = this.emailRef.current?.value;
    const password = this.passwordRef.current?.value;

    // Validate input
    if (!email || !password) {
      this.showToast("Email and password are required", "warning");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.showToast("Please enter a valid email address", "warning");
      return;
    }

    this.setState({ loadingDisplay: true });

    try {
      const response = await apiAuth.login(email, password);
      
      // Clear password field for security
      if (this.passwordRef.current) {
        this.passwordRef.current.value = "";
      }

      this.showToast("Login successful!", "success");
      // Navigate to dashboard
      setTimeout(() => {
        this.props.history.push("/dashboard");
      }, 1000);
    } catch (err) {
      if (err instanceof APIError) {
        if (err.isUnauthorized()) {
          this.showToast("Invalid email or password", "error");
        } else if (err.isServerError()) {
          this.showToast("Server error. Please try again later.", "error");
        } else {
          this.showToast(err.message, "error");
        }
      } else {
        this.showToast("An unexpected error occurred", "error");
      }
    } finally {
      this.setState({ loadingDisplay: false });
    }
  };

  setLoginInfo = (email, pass) => {
    this.emailRef.current.value = email;
    this.passwordRef.current.value = pass;
    this.loginUser();
  };

  registerUser = async () => {
    const name = this.registerNameRef.current?.value;
    const email = this.registerEmailRef.current?.value;
    const password = this.registerPasswordRef.current?.value;

    // Validate input
    if (!name || !email || !password) {
      this.showToast("All fields are required", "warning");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.showToast("Please enter a valid email address", "warning");
      return;
    }

    if (password.length < 6) {
      this.showToast("Password must be at least 6 characters", "warning");
      return;
    }

    this.setState({ loadingDisplay: true });

    try {
      const response = await apiAuth.register(
        name,
        email,
        password,
        this.state.isTeacher
      );

      // Clear form fields
      if (this.registerNameRef.current) this.registerNameRef.current.value = "";
      if (this.registerEmailRef.current) this.registerEmailRef.current.value = "";
      if (this.registerPasswordRef.current) this.registerPasswordRef.current.value = "";

      this.showToast("Registration successful! Please sign in.", "success");
      
      setTimeout(() => {
        this.handleSignin();
      }, 1500);
    } catch (err) {
      if (err instanceof APIError) {
        if (err.isConflict()) {
          this.showToast("Email already exists", "error");
        } else if (err.isValidationError()) {
          this.showToast(
            err.message || "Please check your information",
            "error"
          );
        } else if (err.isServerError()) {
          this.showToast("Server error. Please try again later.", "error");
        } else {
          this.showToast(err.message, "error");
        }
      } else {
        this.showToast("An unexpected error occurred", "error");
      }
    } finally {
      this.setState({ loadingDisplay: false });
    }
  };

  setRegisterInfo = (name, email, pass, isTeacher) => {
    this.registerNameRef.current.value = name;
    this.registerEmailRef.current.value = email;
    this.registerPasswordRef.current.value = pass;
    this.setState({ isTeacher }, () => this.registerUser());
  };

  showToast = (message, type = "info") => {
    this.setState({
      toastVisible: true,
      toastMessage: message,
      toastType: type,
    });
  };

  closeToast = () => {
    this.setState({ toastVisible: false });
  };

  componentDidMount = async () => {
    try {
      const response = await apiAuth.isAuthenticated();
      // User is already authenticated, redirect to dashboard
      this.props.history.push("/dashboard");
    } catch (err) {
      // User is not authenticated, stay on login page
      // This is expected behavior
    }
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
              <Register
                setRegisterInfo={this.setRegisterInfo}
                registerNameRef={this.registerNameRef}
                registerEmailRef={this.registerEmailRef}
                registerPasswordRef={this.registerPasswordRef}
              />
            )}
            {this.state.signInDisplay && (
              <SignIn
                setLoginInfo={this.setLoginInfo}
                emailRef={this.emailRef}
                passwordRef={this.passwordRef}
              />
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
            rel="noopener noreferrer"
            style={{ color: "white" }}
          >
            Our Cookie Policy
          </a>
        </CookieConsent>
        <Toast
          visible={this.state.toastVisible}
          message={this.state.toastMessage}
          type={this.state.toastType}
          onClose={this.closeToast}
        />
        {this.state.loadingDisplay && <Loading />}
      </div>
    );
  }
}

export default withRouter(LandingPage);
