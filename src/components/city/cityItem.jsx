import React from 'react';
import styles from "./CityItem.module.css"
import {Link} from "react-router-dom";

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
    const {cityName, emoji,date, id} = city

    return (
        <li >
            <Link to={`${id}`} className={styles.cityItem}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    );
}

export default CityItem;