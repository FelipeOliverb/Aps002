import React from 'react';

const BdPage: React.FC = () => {
  // Exemplo de arquivos de imagem do banco
  const imagens = [
    { id: 1, nome: "Imagem 1", tamanho: "1.2 MB" },
    { id: 2, nome: "Imagem 2", tamanho: "900 KB" },
    { id: 3, nome: "Imagem 3", tamanho: "2.1 MB" },
  ];

  return (
    <div className="bd-page">
      <h1>Banco de Dados</h1>
      <ul className="bd-list">
        {imagens.map((img) => (
          <li key={img.id} className="bd-list-item">
            <span className="bd-item-nome">{img.nome}</span>
            <span className="bd-item-tamanho">{img.tamanho}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BdPage;
