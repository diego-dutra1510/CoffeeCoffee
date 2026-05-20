import { useState, useEffect } from "react";
import { FaUser, FaHome, FaClipboardList } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./header.css";


function Header() {
    const location = useLocation();
    const [size_icon, setSize_icon] = useState(40);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 480) setSize_icon(10);
            else if (window.innerWidth <= 768) setSize_icon(25);
            else if (window.innerWidth <= 1024) setSize_icon(30);
            else setSize_icon(40);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header>

            <div className="nome">
                <h1>Coffee&Coffee</h1>
            </div>

            <nav className="nav-center">

                <Link
                    to="/"
                    className={location.pathname === "/" ? "active" : ""}
                >
                    <FaHome size={size_icon} />
                </Link>

                <Link
                    to="/gestao_cli"
                    className={location.pathname === "/gestao_cli" ? "active" : ""}
                >
                    <FaUser size={size_icon}/>
                </Link>

                <Link
                    to="/gestao_pedido"
                    className={location.pathname === "/gestao_pedido" ? "active" : ""}
                >
                    <FaClipboardList size={size_icon} />
                </Link>
            </nav>
        </header>
    );
}

export default Header;