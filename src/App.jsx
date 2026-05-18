import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css'

// components
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './telas/home/home';
import Cadastrar from './telas/Cadastrar/cadastrar';
import Config from './telas/Config/config';

function AppContent() {
  const location = useLocation();
  const hideHeader = location.pathname === "/";

  return (
    <>
      <div id='main'>
        {!hideHeader && <Header />}

        <Routes>
          <Route path="/" element={<Cadastrar />} />
          <Route path="/home" element={<Home />} />
          <Route path="/config" element={<Config />} />
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