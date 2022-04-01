import React, { Component } from "react";
import PNavBar from "../private-layout/PNavBar";
import "./Pomodoro.css";

export default class PomodoroComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      minutes: 0,
      workBreak: "Work",
      startButton: "Start",
    };
    this.tenMs = 25 * 6000;
    this.pomLoop = "work1";
    this.pomRunning = true;
    this.pomodoroInterval = null;
    this.pom10Ms = 0;
    this.count = 1;
    this.tempDate = Date.now();
    this.startPomodoro = this.startPomodoro.bind(this);
    this.clearPomodoro = this.clearPomodoro.bind(this);
    this.pausePomodoro = this.pausePomodoro.bind(this);
    this.padLeadingZeros = this.padLeadingZeros.bind(this);
    this.pomSwitch = this.pomSwitch.bind(this);
  }

  componentDidMount() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.count = 0;
        this.tenMs -= (Date.now() - this.tempDate) / 30;
        this.pom10Ms += (Date.now() - this.tempDate) / 30;
        this.tempDate = Date.now();
      } else {
        this.count = 1;
        this.tenMs -= (Date.now() - this.tempDate) / 30;
        this.pom10Ms += (Date.now() - this.tempDate) / 30;
      }
    });
  }

  startPomodoro(min, timeElapsed) {
    //Changes Start Button Display
    this.setState({ startButton: "Start" });
    //Sets time needed to go through loop
    this.tenMs = min * 6000 - timeElapsed;

    this.pomRunning = true;

    //Clears any previously started intervals to prevent overlap
    clearInterval(this.pomodoroInterval);

    //Creation of Interval for timer
    this.pomodoroInterval = setInterval(() => {
      //Detects if the interval is meant to be paused
      if (this.pomRunning) {
        let seconds = Math.floor((this.tenMs - 1) / 100);
        if (this.tenMs === -1) {
          clearInterval(this.pomodoroInterval);
        } else {
          this.setState({ minutes: Math.floor((seconds / 60) % 60) });
          this.setState({ seconds: seconds % 60 });
          this.pom10Ms += this.count;
          this.tenMs -= this.count;
        }
      } else {
        clearInterval(this.pomodoroInterval);
      }
    }, 10);
    if (this.pomRunning) {
      setTimeout(() => {
        this.pom10Ms = 0;
        if (this.pomLoop[0] === "w") {
          this.pomLoop = "break" + this.pomLoop[4];
        } else if (this.pomLoop === "break4") {
          this.pomLoop = "work1";
        } else {
          this.pomLoop = "work" + (Number(this.pomLoop[5]) + 1);
        }
        //Progress to next loop
        // new Audio("../ding-ding-sound-effect.mp3").play();
        this.pomSwitch(this.pomLoop, this.pom10Ms);
      }, this.tenMs * 10);
    }
  }

  //Pauses the pomodoro loop
  pausePomodoro() {
    this.pomRunning = false;
    this.setState({ startButton: "Resume" });
  }

  //Clears the pomodoro loop
  clearPomodoro() {
    this.pomRunning = false;
    this.pom10Ms = 0;
    this.pomLoop = "work1";
    this.setState({ workBreak: "Work" });
    this.setState({ startButton: "Start" });
    this.setState({ minutes: 0 });
    this.setState({ seconds: 0 });
  }

  padLeadingZeros(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  pomSwitch() {
    this.pomRunning = true;
    this.tempDate = Date.now();
    switch (this.pomLoop) {
      case "work1":
      case "work2":
      case "work3":
      case "work4":
        this.setState({ workBreak: "Work" });
        this.startPomodoro(25, this.pom10Ms);
        break;
      case "break1":
      case "break2":
      case "break3":
        this.setState({ workBreak: "Break" });
        this.startPomodoro(5, this.pom10Ms);
        break;
      case "break4":
        this.setState({ workBreak: "Break" });
        this.startPomodoro(25, this.pom10Ms);
        break;
      default:
        //Alerts if there is not a sufficient loop name
        alert("Pomodoro not provided with adequate loop.");
    }
  }

  render() {
    return (
      <>
        <PNavBar />
        <div className="PomodoroData">
          <div className="PomodoroSpan">
            <div className="Pomodoro-div m-3">
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
              <h1 id="workBreakDisplay" style={{ marginTop: 220 + "px" }}>
                {this.state.workBreak}
              </h1>
              <h1
                id="time"
                style={{ fontSize: 50 + "px", marginTop: 30 + "px" }}
              >
                {this.padLeadingZeros(this.state.minutes, 2)} :{" "}
                {this.padLeadingZeros(this.state.seconds, 2)}
              </h1>
            </div>
          </div>
          {/* <div style={{ width: 33.3 + 'vw', textAlign: 'center' }}>
                        
                    </div> */}
          <div className="PomodoroSpan">
            <h4 style={{ marginTop: 100 + "px" }}>
              The Pomodoro Method has been scientifically proven to improve
              productivity by allowing users to regularly take breaks and relax
              their minds. It is encouraged to break down larger projects and
              work on separate aspects each loop. Every 4th break is extended in
              order to give the user a reward for hard work. <br />
              It is recommended to ignore outside temptations while using the
              Pomodoro Method.
            </h4>
            <p>
              Notice: It is recommended to keep this tab full screen in another
              window in order to keep the timer moving while using other
              programs, other programs won't be able to be full screen.
            </p>
          </div>
        </div>
      </>
    );
  }
}
