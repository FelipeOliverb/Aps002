import logo from './assets/imagens/logo.png';
import fundo from './assets/imagens/fundo.mp4';
import './App.css';

function App() {
 

  return (
    <>
      <div className="video-background-container">
        <video
          className="video-background"
          src={fundo}
          autoPlay
          loop
          muted
        />
        <div className="video-overlay"></div>
      </div>

      <div className="app">
        <header className="header">
          <h1>APS</h1>
          <p>Digite qual informação deseja pesquisar e escolha qual estrutura deseja usar para a busca:</p>
        </header>

        <main className="main">
          <div className="search-container">
            <input type="text" placeholder="Digite sua busca..." />
          </div>

          <div className="button-container">
            <button className="btn btn-01">Busca Binária</button>
            <button className="btn btn-02">Busca Linear</button>
            <button className="btn btn-03">Outra Busca</button>
          </div>

          <div className="BancoDeDados">
            <a href="pages/bd.tsx" className="btn btn-bd">Consultar Banco de Dados</a>
          </div>

          <div className="Cronometro">
            <p>Cronômetro: <span>0s</span></p>
          </div>

          <div className="logos">
            <img src={logo} className="logo react" alt="React logo" />
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

export default App;
