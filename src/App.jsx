import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

//components
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './telas/home/home';
import Cadastrar from './telas/Cadastrar/cadastrar';
import Config from './telas/Config/config';

function App() {


  return (
    <Router>
      <div id='main'>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastrar />} />
          <Route path="/config" element={<Config />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App