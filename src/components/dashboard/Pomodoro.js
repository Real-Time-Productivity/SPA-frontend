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
    this.ms = 25 * 60000;
    this.pomLoop = "work1";
    this.pomRunning = true;
    this.pomodoroInterval = null;
    this.pomMs = 0;
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

    //Clears any previously started intervals to prevent overlap
    while (Date.now() - startTime < this.ms && this.pomRunning) {
      await this.countSec();
      let seconds =
        min * 60 - Math.floor((Date.now() - startTime + timeElapsed) / 1000);
      console.log(seconds);
      this.setState({ minutes: Math.floor((seconds / 60) % 60) });
      this.setState({ seconds: seconds % 60 });
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
          </div>
        </div>
      </>
    );
  }
}
