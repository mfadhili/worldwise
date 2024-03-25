import React from 'react';
import Spinner from "../spinner/Spinner.jsx";
import Message from "../message/Message.jsx";
import styles from "./CountryList.module.css"
import CountryItem from "./CountryItem.jsx";

function CountryList({cities, isLoading}) {
    if (isLoading) {
        return (
            <Spinner />
        )
    }

    if (!cities.length) {
        return (
            <Message message={"Add your first city by clicking on a city on the map"} />
        )
    }

    // const countries = cities.reduce((acc,curr) => ,[]);
    const countries = cities.reduce((arr,city) =>
        {
            if (!arr.map(el => el.country).includes(city.country)) {
                return [...arr, {
                    country: city.country,
                    emoji: city.emoji,
                }]
            }
            else {
                return arr;
            }
        },
        []
    );


    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (
                <CountryItem  country={country} />
            ))}
        </ul>
    );
}

export default CountryList;