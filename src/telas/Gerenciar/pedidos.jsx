import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./cadastrar.css";
import axios from "axios";
import Cafe from "../../assets/café.png";

function Pedidos() {

    const navigate = useNavigate();
    const location = useLocation();

    const tela = location.state?.tela;

    const [clientes, setClientes] = useState([]);
    const [produtosDB, setProdutosDB] = useState([]);
    const [pedidos, setPedidos] = useState([]);

    const [cliente_Id, setClienteId] = useState("");

    const [produtoSelecionado, setProdutoSelecionado] = useState("");
    const [quantidade, setQuantidade] = useState(1);

    const [produtos, setProdutos] = useState([]);

    const [Mensagemerr, setErr] = useState("");

    useEffect(() => {

        const buscarDados = async () => {

            try {

                const clientesResponse = await axios.get(
                    "http://localhost:3000/clientes"
                );

                const produtosResponse = await axios.get(
                    "http://localhost:3000/produtos"
                );

                const pedidosResponse = await axios.get(
                    "http://localhost:3000/pedidos"
                );

                setClientes(clientesResponse.data);
                setProdutosDB(produtosResponse.data);
                setPedidos(pedidosResponse.data);

            } catch (error) {
                console.error(error);
            }
        };

        buscarDados();

    }, []);

    const adicionarProduto = () => {

        if (!produtoSelecionado || quantidade <= 0) {
            return;
        }

        const produtoObj = produtosDB.find(
            (p) => p.id == produtoSelecionado
        );

        if (!produtoObj) {
            return;
        }

        const novoProduto = {
            produto_id: produtoObj.id,
            nome: produtoObj.nome,
            quantidade
        };

        setProdutos([...produtos, novoProduto]);

        setProdutoSelecionado("");
        setQuantidade(1);
    };

    const cadastrarPedido = async () => {

        setErr("");

        if (!cliente_Id) {
            setErr("Selecione um cliente");
            return;
        }

        if (produtos.length === 0) {
            setErr("Adicione ao menos um produto");
            return;
        }

        try {

            const response = await axios.post(
                "http://localhost:3000/pedidos",
                {
                    cliente_id: Number(cliente_Id),
                    produtos
                }
            );

            console.log(response.data);

            navigate("/gestao_pedido");

        } catch (error) {

            console.error(error);

            setErr(
                error.response?.data ||
                "Erro ao cadastrar pedido"
            );
        }
    };

    const telas = {

        cadastrar: (

            <main className="cadastrar-page">

                <img id="cafe_img" src={Cafe} alt="Café" />
                <img id="cafe_img1" src={Cafe} alt="Café" />

                <div className="container">

                    <h1 className="cadastrar_h1">
                        Cadastrar Pedido
                    </h1>

                    <hr />

                    <div className="Inputs">

                        <select
                            value={cliente_Id}
                            onChange={(e) => setClienteId(e.target.value)}
                        >
                            <option value="">
                                Selecione o cliente
                            </option>

                            {clientes.map((cliente) => (
                                <option
                                    key={cliente.id}
                                    value={cliente.id}
                                >
                                    {cliente.nome}
                                </option>
                            ))}
                        </select>

                        <select
                            value={produtoSelecionado}
                            onChange={(e) => setProdutoSelecionado(e.target.value)}
                        >
                            <option value="">
                                Selecione o produto
                            </option>

                            {produtosDB.map((produto) => (
                                <option
                                    key={produto.id}
                                    value={produto.id}
                                >
                                    {produto.nome}
                                </option>
                            ))}
                        </select>

                        <input
                            type="number"
                            min="1"
                            value={quantidade}
                            onChange={(e) =>
                                setQuantidade(Number(e.target.value))
                            }
                        />

                        <button onClick={adicionarProduto}>
                            Adicionar Produto
                        </button>

                        <div>

                            {produtos.map((produto, index) => (

                                <div
                                    key={index}
                                    className="cliente-card"
                                >

                                    <h3>{produto.nome}</h3>

                                    <p>
                                        Quantidade: {produto.quantidade}
                                    </p>

                                </div>

                            ))}

                        </div>

                        <p
                            className="msgerr"
                            style={{ color: "red" }}
                        >
                            {Mensagemerr}
                        </p>

                    </div>

                    <button onClick={cadastrarPedido}>
                        <p>Finalizar Pedido</p>
                    </button>

                </div>

            </main>
        ),

        listar: (

            <main className="listar-page">

                <h1 className="cadastrar_h1">
                    Pedidos cadastrados
                </h1>

                <div className="listar-container">

                    {pedidos.length === 0 ? (

                        <p>Nenhum pedido encontrado</p>

                    ) : (

                        pedidos.map((pedido, index) => (

                            <div
                                key={index}
                                className="cliente-card"
                            >

                                <h2>
                                    Pedido #{pedido.pedido_id}
                                </h2>

                                <p>
                                    Cliente: {pedido.cliente_nome}
                                </p>

                                <p>
                                    Produto: {pedido.produto_nome}
                                </p>

                                <p>
                                    Quantidade: {pedido.quantidade}
                                </p>

                                <p>
                                    Status: {pedido.status}
                                </p>

                            </div>

                        ))

                    )}

                </div>

            </main>
        )
    };

    return telas[tela] || <h1>Tela não encontrada</h1>;
}

export default Pedidos;