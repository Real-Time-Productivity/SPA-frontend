import React, { Component } from "react";
import { Link } from 'react-router-dom'
import './PFooter.css'

export default class PFooter extends Component {
    render() {
        return (
            <footer
                className='page-footer'
                style={{
                    position: 'fixed',
                    bottom: '0px',
                    width: '100%',
                    height: '60px',
                }}
            >
                <div
                    className='container center col'
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            margin: '0px 20px 0px 20px',
                        }}
                    >
                        Real Time Productity
                    </div>

                    <div
                        style={{
                            margin: '0px 20px 0px 20px',
                        }}
                    >
                        <Link to='/tipsandtricks' className='brand-logo white-text Dashboard-Nav'>
                            Tips and Tricks
                        </Link>
                    </div>
                </div>
            </footer>
        )
    }
}
