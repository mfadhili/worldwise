// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

/*
* {
    "latitude": -9.340672181980947,
    "lookupSource": "coordinates",
    "longitude": 31.003417968750004,
    "localityLanguageRequested": "en",
    "continent": "Africa",
    "continentCode": "AF",
    "countryName": "Zambia",
    "countryCode": "ZM",
    "principalSubdivision": "Northern",
    "principalSubdivisionCode": "ZM-05",
    "city": "Mpulungu",
    "locality": "Mpulungu District",
    "postcode": "",
    "plusCode": "6G2HM253+P9",
    "localityInfo": {
        "administrative": [
            {
                "name": "Zambia",
                "description": "country at the crossroads of Central and Southern Africa",
                "isoName": "Zambia",
                "order": 3,
                "adminLevel": 2,
                "isoCode": "ZM",
                "wikidataId": "Q953",
                "geonameId": 895949
            },
            {
                "name": "Northern",
                "description": "province of Zambia",
                "isoName": "Northern",
                "order": 4,
                "adminLevel": 4,
                "isoCode": "ZM-05",
                "wikidataId": "Q778738",
                "geonameId": 900601
            },
            {
                "name": "Mpulungu",
                "description": "human settlement in Zambia",
                "order": 5,
                "adminLevel": 5,
                "wikidataId": "Q1951400",
                "geonameId": 175961
            },
            {
                "name": "Mpulungu District",
                "description": "district in Northern Province, Zambia",
                "order": 6,
                "adminLevel": 5,
                "wikidataId": "Q3031571",
                "geonameId": 8260556
            }
        ],
        "informative": [
            {
                "name": "Africa",
                "description": "continent",
                "isoName": "Africa",
                "order": 1,
                "isoCode": "AF",
                "wikidataId": "Q15",
                "geonameId": 6255146
            },
            {
                "name": "Africa/Lusaka",
                "description": "time zone",
                "order": 2
            }
        ]
    }
}
* */

import {useEffect, useState} from "react";

import styles from "./Form.module.css";
import Button from "../button/button.jsx";
import {useNavigate} from "react-router-dom";
import {useUrlPosition} from "../../hooks/useUrlPosition.js";
import Message from "../message/Message.jsx";
import Spinner from "../spinner/Spinner.jsx";

const GEOCODE_URL=`https://api.bigdatacloud.net/data/reverse-geocode-client`;

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [emoji, setEmoji] = useState("")
  const [lat, lng] = useUrlPosition();
    const [geocodingError, setGeocodingError] = useState("")


  /* USING NAVIGATE FOR PROGRAMMATIC NAVIGATION*/
  const navigate = useNavigate();

    useEffect(() => {
        if (!lat && !lng) return;
        async function fetchCityData() {
            try {
                setIsLoadingGeoCoding(true);
                setGeocodingError("")
                const res = await fetch(`${GEOCODE_URL}?latitude=${lat}&longitude=${lng}`);
                const data = await res.json();
                // console.log(data)

                if (!data.countryCode) {
                    throw new Error("That doesnt seem to be a city. Click somewhere else")
                }
                setCityName(data.city || data.locality || "");
                setCountry(data.countryName );
                setEmoji(convertToEmoji(data.countryCode));
            } catch (error) {
                setGeocodingError(error.message)
            } finally {
                setIsLoadingGeoCoding(false);
            }
        }
        fetchCityData();
    }, [lat,lng]);

    if (isLoadingGeoCoding) {
        return <Spinner />
    }

    if (!lat && !lng) {
        return <Message message={"Start by clicking somewhere on the map"} />
    }

    if (geocodingError) {
        return <Message message={geocodingError} />
    }

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
         <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={`primary`} >Add</Button>
        <Button type={`back`} onClick={(event) => {
            event.preventDefault(); // PREVENT THE DEFAULT FORM SUBMISSION ON CLICK
            navigate(-1);
        }}>&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
