import React from 'react';
import styles from "./AppNav.module.css";
import {NavLink} from "react-router-dom";
import Logo from "../logo/Logo.jsx";

function AppNav(props) {
    return (
        <nav className={styles.nav}>
            <Logo />
            <ul>
                <li><NavLink to={"/cities"}>Cities</NavLink></li>
                <li><NavLink to={"/countries"}>Countries</NavLink></li>
                <li><NavLink to={"/login"}>Login</NavLink></li>
            </ul>
        </nav>
    );
}

export default AppNav;