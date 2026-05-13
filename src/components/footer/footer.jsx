import React, { useState, useEffect } from "react";
import "./footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Cidade Baixa. Todos os direitos reservados.</p>
                <div className="social-icons">
                    {/* <a href="https://discord.gg/FW9ZGNZNsr" target="_blank">
                        <FaDiscord className="discord-icon icon" />
                    </a> */}
                </div>
            </div>
        </footer>
    );
}

export default Footer;