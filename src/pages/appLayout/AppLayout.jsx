import React from 'react';
import Sidebar from "../../components/sidebar/sidebar.jsx";
import styles from './AppLayout.module.css'
import Map from "../../components/map/map.jsx";
import User from "../../components/user/User.jsx";

function AppLayout() {
    return (
        <div className={styles.app}>
            <Sidebar />
            <Map />
            <User />
        </div>
    );
}

export default AppLayout;