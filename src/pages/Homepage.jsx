import React from 'react';
import {Link} from "react-router-dom";
import PageNav from "../components/PageNav.jsx";

function Homepage(props) {
    return (
        <div>
            <PageNav />
            <h1>Worldwise</h1>
        </div>
    );
}

export default Homepage;