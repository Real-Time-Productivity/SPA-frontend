import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PNavBar from "../private-layout/PNavBar";
import { logoutUser } from "../../actions/authActions";

class Profile extends Component {
    render() {
        const { user } = this.props.auth;
        return (
            <>
                <PNavBar />
                <div style={{ height: "75vh" }} className="container">
                    <div className="row">
                        <div className="landing-copy col s12 center-align">
                            <h4>
                                <b>Hello,</b> {user.name} <br />
                                <b>You have {user.points} points to spend on rewards</b>
                                <p className="flow-text grey-text text-darken-1">
                                    This is your profile page where you will be able to look at your rewards and check your points frequently
                                </p>
                                <p className="flow-text grey-text text-darken-3 center-align">
                                    At this time, there is not many other features of the profile page
                                </p>
                            </h4>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Profile);
