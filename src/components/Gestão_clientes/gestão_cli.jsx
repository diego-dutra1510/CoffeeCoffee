import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { LuUserRoundPlus, LuUsers, LuUserRoundX, LuUserPen } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import "./gestão_cli.css";


function Gestao_cli() {
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
        <div className="principal">

            <div className="nome">
                <h1 className="h1_gestao">O que vai fazer com os clientes?</h1>
            </div>

            <nav className="cards-container">

                <Link
                    to="/cadastrar"
                    state={{ tela: "listar" }}
                >
                    <div className="card">
                        <LuUsers size={size_icon} />
                        <h1>Listar</h1>
                    </div>
                </Link>


                <Link
                    to="/cadastrar"
                    state={{ tela: "cadastrar" }}
                >
                    <div className="card">
                        <LuUserRoundPlus size={size_icon} />
                        <h1>Cadastrar</h1>
                    </div>
                </Link>




                <Link
                    to="/cadastrar"
                    state={{ tela: "editar" }}
                >
                    <div className="card">
                        <LuUserPen size={size_icon} />
                        <h1>Editar cliente</h1>
                    </div>
                </Link>

                <Link
                    to="/cadastrar"
                    state={{ tela: "remover" }}
                >
                    <div className="card">
                        <LuUserRoundX size={size_icon} />
                        <h1>Remover cliente</h1>
                    </div>
                </Link>

            </nav>
        </div>
    );
}

export default Gestao_cli;