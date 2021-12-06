import React from "react";
import './style.css';
import logo from "../../images/logo.svg"


function Footer() {
    return (
        <>
            <div>
                <nav className="uk-navbar-container footer" uk-navbar="true">
                    <div>
                        <ul className="uk-navbar-nav nav-items">
                            <li>
                                <a target="_blank" href="https://github.com/dimitermusic/petit-frontend">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Footer;