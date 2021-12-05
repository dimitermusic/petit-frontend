import React, { useState, useEffect } from "react";
import './style.css';

function NavBar(props) {
    const [navbarState, setNavbarState] = useState("");

    // useEffect(() => localStorage.token ? setNavbarState("Logout") : setNavbarState("Login"), [<Profile/>])
    return (
        <>
            <div>
                <nav className="uk-navbar-container navbar" uk-navbar="true">
                    <div>
                        <a className="uk-navbar-item uk-logo nav-logo" href="/discover">PETIT | LOGO</a>
                    </div>
                    <div>
                        <ul className="uk-navbar-nav nav-items">
                            <li>
                                <a href="/discover">Discover</a>
                            </li>
                            <li>
                                <a href={`/profile`}>Profile</a>
                            </li>
                            <li>
                                <a href="/logout">{localStorage.token?"Logout":"Login"}</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default NavBar;