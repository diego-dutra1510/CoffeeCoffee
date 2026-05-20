import { useState, useEffect } from "react";
import { MdOutlineList, MdOutlineViewList, MdOutlinePlaylistAddCheck } from "react-icons/md";
import { BiListPlus } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import "./gestão_pedido.css";


function Gestao_pedido() {
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
                <h1 className="h1_gestao">O que vai fazer com os pedidos?</h1>
            </div>

            <nav className="cards-container">

                <Link
                    to="/cadastrar"
                    state={{ tela: "listar" }}
                >
                    <div className="card">
                        <MdOutlineList size={size_icon} />
                        <h1>Listar Pedido</h1>
                    </div>
                </Link>


                <Link
                    to="/pedidos"
                    state={{ tela: "cadastrar" }}
                >
                    <div className="card">
                        <BiListPlus size={size_icon} />
                        <h1>Cadastrar</h1>
                    </div>
                </Link>




                <Link
                    to="/pedidos"
                    state={{ tela: "filtrado" }}
                >
                    <div className="card">
                        <MdOutlineViewList size={size_icon} />
                        <h1>Status</h1>
                    </div>
                </Link>

                <Link
                    to="/pedidos"
                    state={{ tela: "Atualizar_status" }}
                >
                    <div className="card">
                        <MdOutlinePlaylistAddCheck size={size_icon} />
                        <h1>Atualizar Status</h1>
                    </div>
                </Link>

            </nav>
        </div>
    );
}

export default Gestao_pedido;