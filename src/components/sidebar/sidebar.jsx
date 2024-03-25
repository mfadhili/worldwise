import React from 'react';
import styles from "./Sidebar.module.css"
import Logo from "../logo/Logo.jsx";
import AppNav from "../appNav/AppNav.jsx";

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />
            <p>List of cities</p>
            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    &copy; Copyright {new Date().getFullYear()} by WorldWise INc.
                </p>
            </footer>
        </div>
    );
}

export default Sidebar;