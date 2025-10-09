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

  function confirmarImagem() {
    alert("Imagem salva");
    //código para enviar para o banco de dados aqui
    setImagem(null);
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
          <div className="main-top">           
            <div className="main-left">
              <div className="upload-container-wrapper">
                <div className="upload-container">
                  <h3>Adicionar Imagem:</h3>
                  <input type="file" accept="image/*" onChange={handleImagemSelecionada} />

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
                      <div className="preview-buttons">
                        <button className="btn btn-cancel" onClick={() => setImagem(null)}>Cancelar</button>
                        <button className="btn btn-confirm" onClick={confirmarImagem}>Confirmar</button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="ordenacao">
                  <button className="btn btn-ordena">Ordenar Imagens</button>
                </div>
              </div>
              <div className="Cronometro">
                <p className="Cronometro-item">Ordenação1 <span>0s</span></p>
                <p className="Cronometro-item">Ordenação2 <span>0s</span></p>
                <p className="Cronometro-item">Ordenação3 <span>0s</span></p>
              </div>
            </div>

            
            <div className="main-right">
              <Link to="/bd" className="bd-container"></Link>
            </div>
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
