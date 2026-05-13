import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "./config.css";


function Config() {

    const location = useLocation();

    return (
        <main>
            <div className="void"/>
            {location.pathname === "/" ? "" : (<Link to="/" className="back">
                <IoIosArrowBack size={60}/>
            </Link>)}
        </main>
    );
}

export default Config;