import React, {useEffect, useState} from 'react';
import styles from "./Map.module.css"
import {useNavigate, useSearchParams} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {useCities} from "../../contexts/CitiesContext.jsx";

function Map() {

    /*USE NAVIGATE HOOK*/
    // LIKE A STATE HOOK, BUT GRABS PARAMS AND CAN UPDATE QUERY STRING
    const [searchParams,setSearchParams] = useSearchParams()

    const {cities} = useCities();
    const [mapPosition, setMapPosition] = useState([40,0])
    const mapLat = searchParams.get("lat");
    const mapLng = searchParams.get("lng");

    useEffect(() => {
        if (mapLat && mapLng){
            setMapPosition([mapLat,mapLng])
        }
    }, [mapLng, mapLat]);


    return (
        <div className={styles.mapContainer} >
            <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map( city => (
                    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                        <Popup>
                            <span>{city.emoji}</span> <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

function ChangeCenter({position}) {
    const map =    useMap();
    map.setView(position)

    return null
}

function DetectClick() {
    const navigate = useNavigate()

    useMapEvents({
        click: e => {
            console.log(e);
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        },
    })
}

export default Map;
