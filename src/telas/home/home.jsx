import "./home.css";
import {
    FaCoffee,
    FaShoppingCart,
    FaUsers,
    FaChartLine
} from "react-icons/fa";

function Home() {
    return (
        <main className="home-page">
            <section className="home-container">

                <div className="home-title">
                    <h1>Sistema de Gerenciamento de Cafeteria</h1>
                    <p>
                        Gerencie pedidos, clientes, produtos e acompanhe
                        o desempenho da sua cafeteria em um só lugar.
                    </p>
                </div>

                <div className="cards-container">

                    <div className="card">
                        <FaCoffee size={45} />
                        <h2>Produtos</h2>
                        <p>Gerencie cafés, bebidas e itens do cardápio.</p>
                    </div>

                    <div className="card">
                        <FaShoppingCart size={45} />
                        <h2>Pedidos</h2>
                        <p>Controle pedidos realizados pelos clientes.</p>
                    </div>

                    <div className="card">
                        <FaUsers size={45} />
                        <h2>Clientes</h2>
                        <p>Visualize e gerencie clientes cadastrados.</p>
                    </div>

                    <div className="card">
                        <FaChartLine size={45} />
                        <h2>Relatórios</h2>
                        <p>Acompanhe vendas e crescimento da cafeteria.</p>
                    </div>

                </div>

            </section>
        </main>
    );
}

export default Home;