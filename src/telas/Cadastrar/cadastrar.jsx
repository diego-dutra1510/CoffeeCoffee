import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./cadastrar.css";
import axios from "axios";
import Cafe from "../../assets/café.png";

function Cadastrar() {
  const navigate = useNavigate();
  const location = useLocation();

  const tela = location.state?.tela;

  const [Nome, setNome] = useState("");
  const [Email, setEmail] = useState("");
  const [Mensagemerr, setErr] = useState("");
  const [clientes, setClientes] = useState([]);

  useEffect(() => {

    const buscarClientes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/clientes"
        );

        console.log(response.data);
        setClientes(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    buscarClientes();

  }, []);

  const cadastrarCliente = async () => {

    if (!Email.includes("@") || !Email.includes(".")) {
      setErr("Digite um email válido!");
      return;
    }

    if (Nome.trim() === "") {
      setErr("Digite um nome");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/clientes",
        { Nome, Email }
      );

      console.log(response.data);

      setErr("Cliente cadastrado! Redirecionando...");

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.error(error);
      setErr("Erro ao cadastrar");
    }
  };
  const telas = {
    cadastrar: (
      <main className="cadastrar-page">
        <img id="cafe_img" src={Cafe} alt="Café" />
        <img id="cafe_img1" src={Cafe} alt="Café" />

        <div className="container">
          <h1 className="cadastrar_h1">Bem-vindo(a) à Coffee&Coffee</h1>
          <hr />

          <div className="Inputs">
            <input
              type="text"
              placeholder="Digite o nome do usuário"
              value={Nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <input
              type="email"
              placeholder="Digite seu email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <p
              className="msgerr"
              style={{
                color: Mensagemerr.includes("cadastrado")
                  ? "green"
                  : "red"
              }}
            >
              {Mensagemerr}
            </p>
          </div>

          <button onClick={cadastrarCliente}>
            <p>Cadastrar usuário</p>
          </button>
        </div>
      </main>
    ),

    listar: (
      <main className="listar-page">

          <h1 className="cadastrar_h1">Clientes cadastrados</h1>

        <div className="listar-container">


          {clientes.length === 0 ? (
            <p>Nenhum cliente encontrado</p>
          ) : (
            clientes.map((cliente) => (
              <div
                key={cliente.id}
                className="cliente-card"
              >
                <h2>Nome: {cliente.nome}</h2>
                <p>Email: {cliente.email}</p>
              </div>
            ))
          )}

        </div>
      </main>
    )
  };


  return telas[tela] || <h1>Tela não encontrada</h1>;
}

export default Cadastrar;