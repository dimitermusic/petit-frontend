import React, { useState } from "react";
import PropTypes from 'prop-types';
import { getThemeProps } from "@mui/system"

function NavBar(props) {

    return (
        <>
            <div>
                <nav className="uk-navbar-container" uk-navbar="true">

                    <div className="uk-navbar-right">
                        <a className="uk-navbar-item uk-logo" href="/discover">PETIT | LOGO</a>
                
                    <div className="uk-navbar-right">
                        <ul className="uk-navbar-nav">
                            <li className="uk-active">
                                <a href="/discover">Discover</a>
                            </li>
                            <li>
                                <a href="/profile">Profile</a>
                            </li>
                            <li><a href="/logout">Logout</a></li>
                        </ul>
                    </div>
                 </div>
                </nav>
            </div>
        </>
    )
}

export default NavBar;