import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import "./PNavbar.css";

class PNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <nav className="">
        <div className="nav-wrapper ">
          {this.state.width < 1023 ? (
            <>
              <Link
                to="/dashboard"
                style={{
                  fontFamily: "monospace",
                }}
                className="col s8 brand-logo white-text Dashboard-Nav"
              >
                <i className="material-icons Dashboard-NavIcon">
                  rocket_launch
                </i>
                Real Time Productivity
              </Link>
              <button
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "7.5px",
                  margin: "3px",
                  right: "5px",
                  top: "5px",
                  position: "absolute",
                  // marginLeft: "92%",
                  padding: "0",
                }}
                onClick={this.onLogoutClick}
                className="btn btn-medium waves-effect waves-light hoverable white accent-6 center black-text s3"
              >
                <i
                  className="material-icons"
                  style={{
                    height: "30px",
                    width: "30px",
                    fontSize: "30px",
                    top: "-8px",
                    left: "7px",
                    position: "absolute",
                    margin: "0px",
                  }}
                >
                  logout
                </i>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                style={{
                  fontFamily: "monospace",
                  marginLeft: "15px",
                }}
                className="col s9 brand-logo white-text Dashboard-Nav"
              >
                <i className="material-icons Dashboard-NavIcon">
                  rocket_launch
                </i>
                Real Time Productivity
              </Link>
              <button
                style={{
                  width: "125px",
                  borderRadius: "7.5px",
                  letterSpacing: "5px",
                  margin: "5px",
                  right: "10px",
                  top: "10px",
                  position: "absolute",
                  // marginLeft: "92%",
                  padding: "",
                }}
                onClick={this.onLogoutClick}
                className="btn btn-medium waves-effect waves-light hoverable white accent-6 center black-text s3"
              >
                Logout
              </button>
            </>
          )}
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
