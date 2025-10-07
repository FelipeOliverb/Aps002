
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
       <div className="app">
      <header className="header">
        <h1>APS</h1>
        <p>Digite qual informação deseja pesquisar e escolha  qual estrutura deseja usar para a busca:</p>
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

        <div className="logos">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </div>
      </main>

      <footer className="footer">
        <p>APS - 2025/2026</p>
        <p>Felipe de Oliveira Barbosa</p>
        <p>Pedro Augusto Miranda de Souza</p>
      </footer>
    </div>
    </>
  )
}

export default App
