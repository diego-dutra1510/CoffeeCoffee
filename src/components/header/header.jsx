import { useState, useEffect } from "react";
import { IoIosSettings, IoMdCart } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import "./header.css";


function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    let size_icon = 40;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={location.pathname === "/model" ? "header_model" : (isScrolled ? "scrolled" : "")}>

            <div className="nome">
                <h1>Coffee&Coffee</h1>
            </div>

            <nav className="nav-center">

                <Link
                    to="/noticias"
                    className={location.pathname === "/noticias" ? "active" : ""}
                >
                    <IoMdCart size={size_icon} />
                </Link>
                <Link
                    to="/config"
                    className={location.pathname === "/config" ? "active" : ""}
                >
                    <IoIosSettings size={size_icon} />
                </Link>
            </nav>
        </header>
    );
}

export default Header;