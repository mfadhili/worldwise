import React, {useState} from 'react';
import styles from "./Map.module.css"
import {useNavigate, useSearchParams} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

function Map() {

    /*USE NAVIGATE HOOK*/
    const navigate = useNavigate()
    // LIKE A STATE HOOK, BUT GRABS PARAMS AND CAN UPDATE QUERY STRING
    const [searchParams,setSearchParams] = useSearchParams()

    const [mapPosition, setMapPosition] = useState([40,0])
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");


    return (
        <div className={styles.mapContainer} onClick={() => {
            navigate("form")
        }}>
            <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                <Marker position={mapPosition}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default Map;
