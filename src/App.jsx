import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css'

// components
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './telas/home/home';
import Cadastrar from './telas/Gerenciar/cadastrar';
import Pedidos from './telas/Gerenciar/pedidos';
import Gestao_pedido from './components/Gestão_pedidos/gestão_pedido';
import Gestao_cli from './components/Gestão_clientes/gestão_cli';

function AppContent() {
  const location = useLocation();
  const hideHeader = location.pathname === "/cadastrar";

  return (
    <>
      <div id='main'>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastrar" element={<Cadastrar />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/gestao_pedido" element={<Gestao_pedido />} />
          <Route path="/gestao_cli" element={<Gestao_cli />} />
        </Routes>
      </div>
      {!hideHeader && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;