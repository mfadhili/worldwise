import React from 'react';
import styles from "./CityItem.module.css"
import {Link} from "react-router-dom";
import {useCities} from "../../contexts/CitiesContext.jsx";

/*
{
    "cityName": "Berlin",
    "country": "Germany",
    "emoji": "🇩🇪",
    "date": "2027-02-12T09:24:11.863Z",
    "notes": "Amazing 😃",
    "position": {
        "lat": 52.53586782505711,
        "lng": 13.376933665713324
    },
    "id": "98443197"
}
* */

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

function CityItem({city}) {
    // console.log(city)
    const {cityName, emoji,date, id, position} = city
    const {currentCity, deleteCity} = useCities()
    // console.log(position)

    function handleClick(e) {
        e.preventDefault();
        console.log("Test");
        deleteCity(id);
    }
    /* QUERY STRING CREATING URL THAT CAN HOLD "STATE"*/
    return (
        <li >
            <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active']: ''}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
            </Link>
        </li>
    );
}

export default CityItem;