import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <div className="navbar-fixed">
                <nav className="z-depth-0">
                    <div className="nav-wrapper white">
                        <Link
                            to="/"
                            style={{
                                fontFamily: "monospace",
                                display: "flex",
                                flexDirection: "row",
                            }}
                            className="col s5 brand-logo center black-text Navbar-Header"
                        >
                            <i className="material-icons Navbar-Icon">rocket_launch</i>
                            Real Time Productity
                        </Link>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;
