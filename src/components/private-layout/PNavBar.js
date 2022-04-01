import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

class PNavBar extends Component {
    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;
        console.log(this.props.auth);

        return (
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to="/dashboard"
                        style={{
                            fontFamily: "monospace",
                        }}
                        className="col s5 brand-logo white-text"
                    >
                        <i className="material-icons">rocket_launch</i>
                        Real Time Productity
                    </Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <a href="sass.html">Sass</a>
                        </li>
                        <li>
                            <a href="sass.html">Sass</a>
                        </li>
                        <li>
                            <a href="sass.html">Sass</a>
                        </li>
                        <li>
                        <Link to="/pomodoro" className="">
                                <span
                                    style={{
                                        display: "flex",
                                        justifycontent: "space-between",
                                    }}
                                >
                                    <i className="material-icons">task</i>
                                    <h5 className="valign-wrapper" style={{ margin: "0 0 0 5px" }}>
                                        Pomodoro
                                    </h5>
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/tasks" className="">
                                <span
                                    style={{
                                        display: "flex",
                                        justifycontent: "space-between",
                                    }}
                                >
                                    <i className="material-icons">task</i>
                                    <h5 className="valign-wrapper" style={{ margin: "0 0 0 5px" }}>
                                        Task List
                                    </h5>
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className="">
                                <span
                                    style={{
                                        display: "flex",
                                        justifycontent: "space-between",
                                    }}
                                >
                                    <i className="material-icons">person</i>
                                    <h5 className="valign-wrapper" style={{ margin: "0 0 0 5px" }}>
                                        Profile
                                    </h5>
                                </span>
                            </Link>
                        </li>
                        <li>
                            <button
                                style={{
                                    width: "125px",
                                    borderRadius: "7.5px",
                                    letterSpacing: "5px",
                                    margin: "5px",
                                    padding: "",
                                }}
                                onClick={this.onLogoutClick}
                                className="btn btn-medium waves-effect waves-light hoverable white accent-6 center black-text"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

PNavBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(PNavBar);
