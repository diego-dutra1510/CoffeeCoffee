import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "./config.css";


function Config() {

    const location = useLocation();

    const [size_icon, setSize_icon] = useState(40);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 480) setSize_icon(25);
            else if (window.innerWidth <= 768) setSize_icon(35);
            else if (window.innerWidth <= 1024) setSize_icon(30);
            else setSize_icon(40);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <main className="principal_config">
            <div className="void" />
            {location.pathname === "/" ? "" : (<Link to="/" className="back">
                <IoIosArrowBack size={size_icon} />
            </Link>)}
        </main>
    );
}

export default Config;