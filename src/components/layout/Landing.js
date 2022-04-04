import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Landing.css";

class Landing extends Component {
    render() {
        return (
            <>
                <Navbar className="Navbar-Header" />
                <div style={{ height: "75vh" }} className="container valign-wrapper">
                    <div className="row">
                        <div className="col s12 center-align">
                            <h4>
                                <b>Real Time Productivity</b> a solution to become more productive in school.{" "}
                            </h4>
                            <p className="flow-text grey-text text-darken-3">
                                Set timers, create task lists, and use the scientifically proven Pomodoro Technique!
                            </p>
                            <p className="flow-text grey-text text-darken-1">Register or sign in below to continue to the application!</p>
                            <br />
                            <div className="Landing-Buttons center-align">
                                <div className="col s12 m6">
                                    <Link
                                        to="/register"
                                        style={{
                                            width: "200px",
                                            borderRadius: "5px",
                                            letterSpacing: "4px",
                                            fontSize: "22px",
                                            margin: "10px",
                                        }}
                                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                    >
                                        Register
                                    </Link>
                                </div>
                                <div className="col s12 m6">
                                    <Link
                                        to="/login"
                                        style={{
                                            width: "200px",
                                            borderRadius: "5px",
                                            letterSpacing: "4px",
                                            fontSize: "22px",
                                            margin: "10px",
                                        }}
                                        className="btn btn-large waves-effect waves-light hoverable grey accent-3"
                                    >
                                        Log In
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Landing;
