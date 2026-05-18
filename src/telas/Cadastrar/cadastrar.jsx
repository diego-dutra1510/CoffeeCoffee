import { useState, useEffect } from "react";
import { IoIosSettings, IoMdCart } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import "./cadastrar.css";
import axios from 'axios'

function Cadastrar() {

  const [Nome, setNome] = useState("");
  const [Email, setEmail] = useState("");


  const cadastrarCliente = async () => {

    if (!Email.includes("@") || !Email.includes(".")) {
      alert("Digite um email válido!");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/clientes',
        { Nome, Email }
      );

      console.log(response.data);
      alert("Cliente cadastrado!");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar");
    }
  };

  return (
    <main>
      <div className="container">
        <h1>Bem-vindo(a) à Coffee&Coffee</h1>
        <hr />

        <input
          type="name"
          placeholder="Digite o nome do usuário"
          onChange={(e) => setNome(e.target.value.toLowerCase())}
        />
        <input
          type="email"
          placeholder="Digite seu email"
          value={Email}
          required
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />

        <button onClick={cadastrarCliente}></button>
      </div>
    </main>
  );
}

export default Cadastrar;