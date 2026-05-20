import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./cadastrar.css";
import axios from "axios";
import { z } from 'zod';
import Cafe from "../../assets/café.png";

function Cadastrar() {
  const navigate = useNavigate();
  const location = useLocation();
  const array = []



  const tela = location.state?.tela;

  const [Id, setId] = useState(0);
  const [Nome, setNome] = useState("");
  const [Email, setEmail] = useState("");
  const [Mensagemerr, setErr] = useState("");
  const [clientes, setClientes] = useState([]);

  useEffect(() => {

    const buscarIdInicial = async () => {
      try {

        const idInicial = await axios.get(
          "http://localhost:3000/clientes"
        );

        console.log(idInicial.data[0]?.id);
        setId(idInicial.data[0]?.id);

      } catch (error) {
        console.error(error);
      }
    };

    buscarIdInicial();

  }, []);

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

  const clienteSchema = z.object({
    Nome: z
      .string()
      .trim()
      .min(1, { message: "Digite um nome" }),

    Email: z
      .string()
      .trim()
      .min(1, { message: "O e-mail é obrigatório" })
      .email({ message: "Digite um e-mail válido!" })
      .refine((email) => {

        const dominio = email.split('@')[1] || '';

        const partes = dominio.split('.');

        const eComposto = partes.length > 2;
        const extensaoFinal = eComposto
          ? `${partes[partes.length - 2]}.${partes[partes.length - 1]}`
          : partes[partes.length - 1];

        const extensoesPermitidas = ['com', 'com.br', 'net', 'net.br', 'org', 'org.br', 'edu', 'gov'];

        return extensoesPermitidas.includes(extensaoFinal.toLowerCase());
      }, {
        message: "Extensão inválida! Use terminações comuns como .com ou .com.br"
      })
  });

  const cadastrarCliente = async () => {
    setErr("");

    const resultado = clienteSchema.safeParse({ Nome, Email });

    if (!resultado.success) {
      const primeiraMensagemErro = resultado.error.issues[0].message;
      setErr(primeiraMensagemErro);
      return;
    }

    const dadosValidados = resultado.data;

    try {


      const response = await (tela === "cadastrar" ? axios.post("http://localhost:3000/clientes", dadosValidados) : axios.put(`http://localhost:3000/clientes/${Id}`, dadosValidados));


      console.log(response.data);


      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.error(error);
      const mensagemErro = error.response?.data?.message || "Erro ao cadastrar";
      setErr(mensagemErro);
    }

  };

  const deletarUser = async () => {
    setErr("");

    try {


      const response = await axios.delete(`http://localhost:3000/clientes/${Id}`, Id);


      console.log(response.data);


      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.error(error);
      const mensagemErro = error.response?.data?.message || "Erro ao cadastrar";
      setErr(mensagemErro);
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
                color: "red"
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
                <h2>Id: {cliente.id}</h2>
                <h2>Nome: {cliente.nome}</h2>
                <p>Email: {cliente.email}</p>
              </div>
            ))
          )}

        </div>
      </main>
    ),
    editar: (
      <main className="cadastrar-page">
        <img id="cafe_img" src={Cafe} alt="Café" />
        <img id="cafe_img1" src={Cafe} alt="Café" />

        <div className="container">
          <h1 className="cadastrar_h1">Atualizar Usuário</h1>
          <hr />

          <div className="Inputs">

            <select onChange={(e) => {
              if (e.target.value) {
                const clienteObj = JSON.parse(e.target.value);
                setId(clienteObj.id);
                setNome(clienteObj.nome);
                setEmail(clienteObj.email);
              }
            }} name="usuários" id="user_select">
              {clientes.map((cliente) => (
                <option key={cliente.id} value={JSON.stringify(cliente)}>{cliente.nome}</option>
              ))}
            </select>

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
                color: "red"
              }}
            >
              {Mensagemerr}
            </p>
          </div>

          <button onClick={cadastrarCliente}>
            <p>Atualizar usuário</p>
          </button>
        </div>
      </main>
    ),
    remover: (
      <main className="cadastrar-page">
        <img id="cafe_img" src={Cafe} alt="Café" />
        <img id="cafe_img1" src={Cafe} alt="Café" />

        <div className="container">
          <h1 className="cadastrar_h1">Remover Usuário</h1>
          <hr />

          <div className="Inputs">

            <select onChange={(e) => {
              if (e.target.value) {
                setId(e.target.value);
              }
            }} name="usuários" id="user_select">
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
              ))}
            </select>

            <p
              className="msgerr"
              style={{
                color: "red"
              }}
            >
              {Mensagemerr}
            </p>
          </div>

          <button onClick={deletarUser}>
            <p>Deletar</p>
          </button>
        </div>
      </main>
    )
  };


  return telas[tela] || <h1>Tela não encontrada</h1>;
}

export default Cadastrar;