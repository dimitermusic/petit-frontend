import React from "react";
import './style.css';
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg"


function NavBar(props) {
    return (
        <>
            <div>
                <nav className="uk-navbar-container navbar" uk-navbar="true">
                    <div>
                        <a className="uk-navbar-item uk-logo nav-logo" href="/discover">PETIT <img src={logo} alt="petit logo"></img></a>

                    </div>
                    <div>
                        <ul className="uk-navbar-nav nav-items">
                            <li>
                                <a href="/discover">Discover</a>
                            </li>
                            <li>
                                <a href={props.userState.username ? `/profile` : "/login"}>Profile</a>
                            </li>
                            <li>
                                <a href="/logout">{props.userState.username ? "Logout" : "Login"}</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default NavBar;