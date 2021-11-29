import React, { useState } from "react";
import PropTypes from 'prop-types';
import { getThemeProps } from "@mui/system"

function NavBar(props) {

    return (
        <>
            <div>
                <nav class="uk-navbar-container" uk-navbar>

                    <div class="uk-navbar-right">
                        <a class="uk-navbar-item uk-logo" href="#">PETIT | LOGO</a>
                
                    <div class="uk-navbar-right">
                        <ul class="uk-navbar-nav">
                            <li class="uk-active">
                                <a href="#">Parent</a>
                            </li>
                            <li>
                                <a href="#">Discover</a>
                            </li>
                            <li><a href="#">Profile</a></li>
                        </ul>
                    </div>
                 </div>
                </nav>
            </div>
        </>
    )
}

export default NavBar;