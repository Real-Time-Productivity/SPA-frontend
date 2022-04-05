import React, { Component } from "react";
import "./PFooter.css";

export default class PFooter extends Component {
    render() {
        return (
            <footer
                className="page-footer"
                style={{
                    position: "fixed",
                    bottom: "0px",
                    width: "100%",
                    height: "60px",
                }}
            >
                <div className="container center">Real Time Productity</div>
            </footer>
        );
    }
}
