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

  const [bubbleTime, setBubbleTime] = useState<number>(0);
  const [quickTime, setQuickTime] = useState<number>(0);
  const [mergeTime, setMergeTime] = useState<number>(0);

  // @ts-ignore
  const REMOTO = "https://apsapi-production.up.railway.app/";
  // @ts-ignore
  const LOCAL = "http://localhost:8080/";

  const BASE_URL = REMOTO;

  const [loading, setLoading] = useState<boolean>(true);

  async function waitForBackend() {
    while (true) {
      try {
        const response = await fetch(BASE_URL + "api/images/testConnection");
        if (response.ok) {
          console.log("Backend OK!");
          break;
        }
      } catch {
        console.warn("Backend ainda indisponível, tentando novamente em 2...");
      }
      await new Promise(res => setTimeout(res, 2000)); // espera 1s antes de tentar novamente
    }
  }


// ... dentro da função carregarDadosDoBackend:
async function carregarDadosDoBackend() {
  setLoading(true);
  await waitForBackend();
  try {
    const response = await fetch(BASE_URL + "api/images/info/sorted");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const jsonData: { 
      times: { quick: number; bubble: number; merge: number }; 
      sortedList: { id: number; date: string; url: string; sortId: number }[] 
    } = await response.json();

    // Atualiza os cronômetros com os valores do JSON
    setBubbleTime(jsonData.times.bubble);
    setQuickTime(jsonData.times.quick);
    setMergeTime(jsonData.times.merge);

    const dadosConvertidos: Dado[] = jsonData.sortedList.map((item) => ({
      id: item.id,
      nome: `Img${item.id}`,
      data: item.date,
      imagem: "https://" + item.url
    }));

    setDados(dadosConvertidos);
  } catch (err) {
    console.error(err);
    alert("Erro ao carregar dados do backend");
  } finally {
    setLoading(false);
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

      const response = await fetch(BASE_URL + "api/images/uploadBase64", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64 })
      });

      const texto = await response.text();

      if (response.ok) {
        alert("Imagem enviada com sucesso!");
        setPreview(null);
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

  async function deletarImagem(id: number) {
  try {
    const response = await fetch(`https://apsapi-production.up.railway.app/api/images/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar imagem (status ${response.status})`);
    }

    console.log("Imagem deletada com sucesso!");
  } catch (error) {
    console.error("Erro:", error);
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
                 <div className="Cronometro">
                  <p className="Cronometro-item">Bubble <span>{bubbleTime}ms</span></p>
                  <p className="Cronometro-item">Quick <span>{quickTime}ms</span></p>
                  <p className="Cronometro-item">Merge <span>{mergeTime}ms</span></p>
                </div>
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
                        <th>Opções</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={4} style={{ textAlign: "center" }}>Carregando imagens...</td>
                        </tr>
                      ) : (
                        dados.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.data}</td>
                            <td>
                              <div className="button-container">
                                <button className="btn btn-view" onClick={() => window.open(item.imagem, "_blank")}>Ver</button>
                                <button className="btn btn-delete" onClick={async () => {
                                    if (window.confirm(`Deseja realmente excluir a imagem ${item.nome}?`)) {
                                      await deletarImagem(item.id);
                                      carregarDadosDoBackend(); // Atualiza a tabela
                                    }
                                  }}>Excluir</button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
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
