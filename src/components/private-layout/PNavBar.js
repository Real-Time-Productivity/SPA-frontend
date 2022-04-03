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
