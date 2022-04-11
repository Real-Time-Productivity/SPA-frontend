import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import PNavBar from '../private-layout/PNavBar'
import './Dashboard.css'
import PFooter from '../private-layout/PFooter'

class TipsAndTricks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: window.innerWidth,
        }
    }
    onLogoutClick = (e) => {
        e.preventDefault()
        this.props.logoutUser()
    }

    render() {
        const { user } = this.props.auth

        return (
            <main>
                <PNavBar className='Dashboard-Nav' />
                <div style={{}} className='container'>
                    <div className='row Dashboard-Content'>
                        <h4 className='Dashboard-Header' style={this.state.width < 1023 ? { textAlign: 'center' } : {}}>
                            <b>Hello,</b> {user.name.split(' ')[0]}
                        </h4>
                        <div className=' col s12 m6'>
                            <h5>
                                <p className='flow-text grey-text text-darken-1'>
                                    Welcome to Real Time Productivity, a high schooler's attempt to fix a high school
                                    problem. We tasked ourselves with trying to solve high schooler's lack of
                                    productivity. We, as high schoolers, suffer from this as well and are attempting to
                                    devise a solution in order to help you too. In this alpha version of the program, we
                                    want to utilize the Pomodoro Method as the most important thing of the program.
                                </p>
                                <p className='flow-text grey-text text-darken-1'>
                                    Down the line more features will be added including Task Lists, Calenders, and
                                    Badges that are earned through continued use of the application. These will be added
                                    at a later time, at this stage of testing, this is all that is needed.
                                </p>
                            </h5>
                        </div>
                        <div className='landing-copy col s12 m6'>
                            <h5>
                                <p className='flow-text grey-text text-darken-1'>
                                    The Pomodoro Method has been scientifically proven to improve productivity by
                                    allowing users to regularly take breaks and relax their minds. It is encouraged to
                                    break down larger projects and work on separate aspects each loop. Every 4th break
                                    is extended in order to give the user a reward for hard work. <br />
                                    It is recommended to ignore outside temptations while using the Pomodoro Method.
                                </p>
                                <p className='flow-text grey-text text-darken-1'>
                                    Notice: It is recommended to keep this tab full screen in another window in order to
                                    keep the timer moving while using other programs, other programs won't be able to be
                                    full screen.
                                </p>
                            </h5>
                        </div>
                    </div>
                </div>
                <PFooter />
            </main>
        )
    }
}

TipsAndTricks.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser })(TipsAndTricks)
