import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import PNavBar from "../private-layout/PNavBar";
import "./Dashboard.css";
import PFooter from "../private-layout/PFooter";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      minutes: 0,
      workBreak: "Work",
      startButton: "Start",
      width: window.innerWidth,
    };
    this.ms = 25 * 60000;
    this.pomLoop = "work1";
    this.pomRunning = true;
    this.pomodoroInterval = null;
    this.pomMs = 0;
    this.running = false;
    this.startPomodoro = this.startPomodoro.bind(this);
    this.clearPomodoro = this.clearPomodoro.bind(this);
    this.pausePomodoro = this.pausePomodoro.bind(this);
    this.padLeadingZeros = this.padLeadingZeros.bind(this);
    this.pomSwitch = this.pomSwitch.bind(this);
    const countSec = () => new Promise((res) => setTimeout(res, 1000));
    this.countSec = countSec;
  }

  async startPomodoro(min, timeElapsed) {
    //Changes Start Button Display
    this.setState({ startButton: "Start" });
    //Sets time needed to go through loop
    this.ms = min * 60000 - timeElapsed;
    let startTime = Date.now();
    this.pomRunning = true;
    console.log("run");
    if (!this.running) {
      this.running = true;
      while (Date.now() - startTime < this.ms && this.pomRunning) {
        await this.countSec();
        let seconds =
          min * 60 - Math.floor((Date.now() - startTime + timeElapsed) / 1000);
        console.log(seconds);
        this.setState({ minutes: Math.floor((seconds / 60) % 60) });
        this.setState({ seconds: seconds % 60 });
      }
      this.running = false;
    }
    this.pomMs = Date.now() - startTime;

    if (this.pomRunning) {
      this.pomMs = 0;
      if (this.pomLoop[0] === "w") {
        this.pomLoop = "break" + this.pomLoop[4];
      } else if (this.pomLoop === "break4") {
        this.pomLoop = "work1";
      } else {
        this.pomLoop = "work" + (Number(this.pomLoop[5]) + 1);
      }
      //Progress to next loop
      // new Audio("../ding-ding-sound-effect.mp3").play();
      this.pomSwitch();
    }
  }

  //Pauses the pomodoro loop
  pausePomodoro() {
    this.pomRunning = false;
    this.setState({ startButton: "Resume" });
  }

  //Clears the pomodoro loop
  async clearPomodoro() {
    this.pomRunning = false;
    this.pomLoop = "work1";
    await this.countSec();
    this.setState({ workBreak: "Work" });
    this.setState({ startButton: "Start" });
    this.setState({ minutes: 0 });
    this.setState({ seconds: 0 });
    this.pomMs = 0;
  }

  padLeadingZeros(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  pomSwitch() {
    this.pomRunning = true;
    switch (this.pomLoop) {
      case "work1":
      case "work2":
      case "work3":
      case "work4":
        this.setState({ workBreak: "Work" });
        this.startPomodoro(25, this.pomMs);
        break;
      case "break1":
      case "break2":
      case "break3":
        this.setState({ workBreak: "Break" });
        this.startPomodoro(5, this.pomMs);
        break;
      case "break4":
        this.setState({ workBreak: "Break" });
        this.startPomodoro(25, this.pomMs);
        break;
      default:
        //Alerts if there is not a sufficient loop name
        alert("Pomodoro not provided with adequate loop.");
    }
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <main>
        <PNavBar className="Dashboard-Nav" />
        <div style={{}} className="container">
          <div className="row Dashboard-Content">
            <h4
              className="Dashboard-Header"
              style={this.state.width < 1023 ? { textAlign: "center" } : {}}
            >
              <b>Hello,</b> {user.name.split(" ")[0]}
            </h4>
            <div className=" col s12 m6">
              <h5>
                <p className="flow-text grey-text text-darken-1">
                  Welcome to Real Time Productivity, a high schooler's attempt
                  to fix a high school problem. We tasked ourselves with trying
                  to solve high schooler's lack of productivity. We, as high
                  schoolers, suffer from this as well and are attempting to
                  devise a solution in order to help you too. In this alpha
                  version of the program, we want to utilize the Pomodoro Method
                  as the most important thing of the program.
                </p>
                <p className="flow-text grey-text text-darken-1">
                  Down the line more features will be added including Task
                  Lists, Calenders, and Badges that are earned through continued
                  use of the application. These will be added at a later time,
                  at this stage of testing, this is all that is needed.
                </p>
                {this.state.width > 1023 ? (
                  <>
                    <button
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        margin: "10px",
                      }}
                      onClick={this.pomSwitch}
                      className="btn btn-medium waves-effect waves-light hoverable blue accent-3 center-wrapper"
                    >
                      {this.state.startButton}
                    </button>
                    <button
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        margin: "10px",
                      }}
                      onClick={this.pausePomodoro}
                      className="btn btn-medium waves-effect waves-light hoverable blue accent-3 center-wrapper"
                    >
                      Pause
                    </button>
                    <button
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        margin: "10px",
                      }}
                      onClick={this.clearPomodoro}
                      className="btn btn-medium waves-effect waves-light hoverable blue accent-3 center-wrapper"
                    >
                      Clear
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </h5>
            </div>
            <div className="landing-copy col s12 m6">
              <h5>
                <p className="flow-text grey-text text-darken-1">
                  The Pomodoro Method has been scientifically proven to improve
                  productivity by allowing users to regularly take breaks and
                  relax their minds. It is encouraged to break down larger
                  projects and work on separate aspects each loop. Every 4th
                  break is extended in order to give the user a reward for hard
                  work. <br />
                  It is recommended to ignore outside temptations while using
                  the Pomodoro Method.
                </p>
              </h5>

              {this.state.width < 1023 ? (
                <>
                  <div className="center-align">
                    <h5>
                      <button
                        style={{
                          width: "100px",
                          borderRadius: "3px",
                          letterSpacing: "1.5px",
                          margin: "5px",
                        }}
                        onClick={this.pomSwitch}
                        className="btn btn-medium waves-effect waves-light hoverable blue accent-3 center-wrapper"
                      >
                        {this.state.startButton}
                      </button>
                      <button
                        style={{
                          width: "110px",
                          borderRadius: "3px",
                          letterSpacing: "1.5px",
                          margin: "5px",
                        }}
                        onClick={this.pausePomodoro}
                        className="btn btn-medium waves-effect waves-light hoverable blue accent-3 center-wrapper"
                      >
                        Pause
                      </button>
                      <button
                        style={{
                          width: "110px",
                          borderRadius: "3px",
                          letterSpacing: "1.5px",
                          margin: "5px",
                        }}
                        onClick={this.clearPomodoro}
                        className="btn btn-medium waves-effect waves-light hoverable blue accent-3 center-wrapper"
                      >
                        Clear
                      </button>
                    </h5>
                  </div>

                  <div className="PomodoroSpan center-align">
                    <div className="Pomodoro-div m-3">
                      <h1 id="workBreakDisplay">{this.state.workBreak}</h1>
                      <h1 id="time" style={{ fontSize: 50 + "px" }}>
                        {this.padLeadingZeros(this.state.minutes, 2)} :{" "}
                        {this.padLeadingZeros(this.state.seconds, 2)}
                      </h1>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="PomodoroSpan center-align">
                    <div className="Pomodoro-div m-3">
                      <h1 id="workBreakDisplay">{this.state.workBreak}</h1>
                      <h1 id="time" style={{ fontSize: 50 + "px" }}>
                        {this.padLeadingZeros(this.state.minutes, 2)} :{" "}
                        {this.padLeadingZeros(this.state.seconds, 2)}
                      </h1>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <PFooter />
      </main>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
