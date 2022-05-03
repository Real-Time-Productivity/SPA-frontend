import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import PNavBar from "../private-layout/PNavBar";
import "./Dashboard.css";
import PFooter from "../private-layout/PFooter";

class TipsAndTricks extends Component {
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
                  While using the Pomodoro Method, make sure to avoid any
                  outside distractions. One of the primary concepts in the
                  Pomodoro Method is avoiding distractions during your work
                  period. <br /> It can be helpful to break down larger tasks
                  into subtasks that are more manageable. This can make tasks
                  less daunting and allow you to work more efficiently. <br />{" "}
                  Students on average perform better in logical classes such as
                  math and engineering in the morning and better at analytical
                  classes such as languages and social sciences in the
                  afternoon. Using this to make a schedule can help
                  significantly in the learning process.
                </p>
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
                  work.
                </p>
              </h5>
            </div>
          </div>
        </div>
        <PFooter />
      </main>
    );
  }
}

TipsAndTricks.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(TipsAndTricks);
