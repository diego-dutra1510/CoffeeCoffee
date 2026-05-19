import "./footer.css";
import { FaCoffee, FaInstagram, FaGithub } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">

                <div className="footer-brand">
                    <FaCoffee size={24} />
                    <div>
                        <h3>Coffee&Coffee</h3>
                        <p>Sistema de gerenciamento de cafeteria</p>
                    </div>
                </div>

                <div className="footer-center">
                    <p>
                        © {new Date().getFullYear()} Coffee&Coffee.
                        Todos os direitos reservados.
                    </p>
                </div>

                <div className="footer-icons">
                    <a href="#">
                        <FaInstagram />
                    </a>

                    <a href="#">
                        <FaGithub />
                    </a>
                </div>

            </div>
        </footer>
    );
}

export default Footer;