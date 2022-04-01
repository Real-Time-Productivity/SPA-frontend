import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import PNavBar from "../private-layout/PNavBar";

class Dashboard extends Component {
    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;

        return (
            <>
                <PNavBar />
                <div style={{ height: "75vh" }} className="container valign-wrapper">
                    <div className="row">
                        <div className="landing-copy col s12 center-align">
                            <h4>
                                <b>Hello,</b> {user.name.split(" ")[0]}
                                <p className="flow-text grey-text text-darken-1">
                                    You are now logged into Real Time Productity. Below are a list of the differnet pages and a short description
                                </p>
                                <p className="flow-text grey-text text-darken-1 center-align">
                                    Task List: A place to keep track of homework assignments
                                    <Link to="/tasks">
                                        <button
                                            style={{
                                                width: "150px",
                                                borderRadius: "3px",
                                                letterSpacing: "1.5px",
                                                margin: "0 0 0 10px",
                                            }}
                                            className="btn btn-medium waves-effect waves-light hoverable blue accent-3 center-wrapper"
                                        >
                                            Task List
                                        </button>
                                    </Link>
                                </p>
                                <p className="flow-text grey-text text-darken-1 center-align">
                                    Profile: A place to keep track of your experience and badges
                                    <Link to="/profile">
                                        <button
                                            style={{
                                                width: "150px",
                                                borderRadius: "3px",
                                                letterSpacing: "1.5px",
                                                margin: "0 0 0 10px",
                                            }}
                                            className="btn btn-medium waves-effect waves-light hoverable blue accent-3 center-wrapper"
                                        >
                                            Profile
                                        </button>
                                    </Link>
                                </p>
                                <p className="flow-text grey-text text-darken-1 center-align">
                                    Pomodoro: A place to keep track different work and break periods
                                    <Link to="/pomodoro">
                                        <button
                                            style={{
                                                width: "150px",
                                                borderRadius: "3px",
                                                letterSpacing: "1.5px",
                                                margin: "0 0 0 10px",
                                            }}
                                            className="btn btn-medium waves-effect waves-light hoverable blue accent-3 center-wrapper"
                                        >
                                            Pomodoro
                                        </button>
                                    </Link>
                                </p>
                            </h4>
                        </div>
                    </div>
                </div>
            </>
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
