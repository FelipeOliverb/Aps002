import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import logo from './assets/imagens/logo.png';
import fundo from './assets/imagens/fundo.mp4';
import BD from './pages/bd';
import './App.css';

function Home() {

  const [imagem, setImagem] = useState<string | null>(null);

  function handleImagemSelecionada(event: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = event.target.files?.[0];
    if (arquivo) {
      const urlTemporaria = URL.createObjectURL(arquivo);
      setImagem(urlTemporaria); 
    }
  }

  return (
    <>
      <div className="video-background-container">
        <video className="video-background" src={fundo} autoPlay loop muted />
        <div className="video-overlay"></div>
      </div>

      <div className="app">

        <header className="header">
          <div className="header-logo-text">
            <img src={logo} className="logo" alt="Logo" />
            <h1>APS</h1>
          </div>
        </header>
        

        <main className="main">
       

          <div className="BancoDeDados">
            <Link to="/bd" className="btn btn-bd">Consultar Banco de Dados</Link>
          </div>

          
          <div className="upload-container" style={{ marginTop: "30px" }}>
            <h3>Adicionar Imagem:</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleImagemSelecionada}
              className="btn"
            />
           
            {imagem && (
              <div style={{ marginTop: "20px" }}>
                <h4>Pré-visualização:</h4>
                <img
                  src={imagem}
                  alt="Prévia"
                  style={{
                    maxWidth: "300px",
                    borderRadius: "10px",
                    marginTop: "10px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.5)"
                  }}
                />
              </div>
            )}
          </div>

          <div className="ordenacao">
            <button className="btn btn-ordena">Ordenar Imagens</button>
          </div>

          <div className="Cronometro">
            <p className="Cronometro-item">Ordenação1 <span>0s</span></p>
            <p className="Cronometro-item">Ordenação2 <span>0s</span></p>
            <p className="Cronometro-item">Ordenação3 <span>0s</span></p>
          </div>

          
        </main>

        <footer className="footer">
          <p>APS - 2025/2026</p>
          <p>Felipe de Oliveira Barbosa</p>
          <p>Pedro Augusto Miranda de Souza</p>
        </footer>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bd" element={<BD />} />
      </Routes>
    </Router>
  );
}

export default App;
