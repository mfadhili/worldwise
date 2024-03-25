import React from 'react';
import styles from "./Map.module.css"
import {useSearchParams} from "react-router-dom";

function Map() {

    // LIKE A STATE HOOK, BUT GRABS PARAMS AND CAN UPDATE QUERY STRING
    const [searchParams,setSearchParams] = useSearchParams()
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return (
        <div className={styles.mapContainer}>
            <h1>Map</h1>
            <h1>Position {lat}, {lng}</h1>
            <button onClick={() => {
                setSearchParams({lat: 23, lng: 24})
            }}>
                Change Pos
            </button>
        </div>
    );
}

export default Map;
