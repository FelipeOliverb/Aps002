import React from 'react';

const BdPage: React.FC = () => {
  // Exemplo de dados do banco (vai ser substituído pelo banco real depois)
  const dados = [
    { id: 1, nome: "Arquivo 1", tipo: "Imagem", tamanho: "1.2 MB" },
    { id: 2, nome: "Arquivo 2", tipo: "Documento", tamanho: "500 KB" },
    { id: 3, nome: "Arquivo 3", tipo: "Imagem", tamanho: "2.1 MB" },
  ];

  return (
    <div className="bd-page">
      <h1>Banco de Dados</h1>
      <ul className="bd-list">
        {dados.map((item) => (
          <li key={item.id} className="bd-list-item">
            <span className="bd-item-nome">{item.nome}</span>
            <span className="bd-item-tipo">{item.tipo}</span>
            <span className="bd-item-tamanho">{item.tamanho}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BdPage;
