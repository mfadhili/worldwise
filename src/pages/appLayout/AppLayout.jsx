import React from 'react';
import Sidebar from "../../components/sidebar/sidebar.jsx";
import styles from './AppLayout.module.css'
import Map from "../../components/map/map.jsx";

function AppLayout() {
    return (
        <div className={styles.app}>
            <Sidebar />
            <Map />
        </div>
    );
}

export default AppLayout;