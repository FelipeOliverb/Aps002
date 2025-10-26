// App.tsx
import { useState, useEffect } from "react";
import logo from './assets/imagens/logo.png';
import fundo from './assets/imagens/fundo.mp4';
import './App.css';

interface Dado {
  id: number;
  nome: string;
  data: string;
  imagem: string;
}

function App() {
  const [preview, setPreview] = useState<string | null>(null);
  const [dados, setDados] = useState<Dado[]>([]); 
  const [nomeInput, setNomeInput] = useState("");

  async function carregarDadosDoBackend() {
    try {
      const response = await fetch("https://apsapi-production.up.railway.app/api/images/info");
      if (!response.ok) throw new Error("Erro ao buscar dados do backend");

      const jsonData: { id: number; date: string; url: string }[] = await response.json();

      const dadosConvertidos: Dado[] = jsonData.map((item) => ({
        id: item.id,
        nome: `Img${item.id}`,
        data: item.date,
        imagem: "https://" + item.url
      }));

      setDados(dadosConvertidos);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar dados do backend");
    }
  }

  useEffect(() => {
    carregarDadosDoBackend();
  }, []);

  function handleImagemSelecionada(event: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = event.target.files?.[0];
    if (arquivo) {
      const urlTemporaria = URL.createObjectURL(arquivo);
      setPreview(urlTemporaria);
    }
  }

  async function enviarImagemParaAPI(file: File) {
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (typeof reader.result === "string") {
            const base64String = reader.result.split(",")[1];
            resolve(base64String);
          } else reject("Erro ao ler o arquivo");
        };
        reader.onerror = (error) => reject(error);
      });

      const response = await fetch("https://apsapi-production.up.railway.app/api/images/uploadBase64", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64 })
      });

      const texto = await response.text();

      if (response.ok) {
        alert("Imagem enviada com sucesso!");
        setPreview(null);
        setNomeInput("");
        carregarDadosDoBackend(); 
      } else {
        alert("Erro ao enviar imagem: " + texto);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao processar a imagem.");
    }
  }

  function confirmarImagem() {
    if (!preview) return;

    const arquivoInput = document.querySelector<HTMLInputElement>("input[type=file]");
    if (arquivoInput?.files?.[0]) {
      enviarImagemParaAPI(arquivoInput.files[0]);
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
          <div className="main-top">
            <div className="main-left">
              <div className="upload-container-wrapper">
                <div className="upload-container">
                  <h3>Adicionar Imagem:</h3>
                  <input type="file" accept="image/*" onChange={handleImagemSelecionada} />
                  <input
                    type="text"
                    placeholder="Nome da Imagem"
                    value={nomeInput}
                    onChange={(e) => setNomeInput(e.target.value)}
                    style={{ marginTop: "10px", padding: "5px", borderRadius: "5px" }}
                  />

                  {preview && (
                    <div style={{ marginTop: "20px" }}>
                      <h4>Pré-visualização:</h4>
                      <img
                        src={preview}
                        alt="Prévia"
                        style={{
                          maxWidth: "300px",
                          borderRadius: "10px",
                          marginTop: "10px",
                          boxShadow: "0 0 10px rgba(0,0,0,0.5)"
                        }}
                      />
                      <div className="preview-buttons">
                        <button className="btn btn-cancel" onClick={() => setPreview(null)}>Cancelar</button>
                        <button className="btn btn-confirm" onClick={confirmarImagem}>Confirmar</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="main-right">
              <div className="bd-container">
                <h2>Banco de Dados</h2>
                <div className="bd-table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Data</th>
                        <th>Imagem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dados.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.nome}</td>
                          <td>{item.data}</td>
                          <td>
                            <img
                              src={item.imagem}
                              alt={item.nome}
                              style={{ width: '50px', cursor: 'pointer', borderRadius: '5px' }}
                              onClick={() => window.open(item.imagem, "_blank")}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="footer">
          <p>APS - 2025/2</p>
          <p>Felipe de Oliveira Barbosa</p>
          <p>Pedro Augusto Miranda de Souza</p>
        </footer>
      </div>
    </>
  );
}

export default App;
