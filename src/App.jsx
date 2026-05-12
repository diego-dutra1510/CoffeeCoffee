import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

//components
import Header from './components/header';
import Footer from './components/footer';
import Home from './telas/home';
import Cadastrar from './telas/Cadastrar';

function App() {


  return (
    <Router>
      <div id='main'>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastrar />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App