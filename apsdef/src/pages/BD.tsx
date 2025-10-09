import React from 'react';

const BD = () => {
  return (
    <div className="page-content">
      <h1>Página BD</h1>
      <p>Este é o conteúdo da aba "BD". Aqui você pode integrar com um banco de dados, mostrar tabelas ou gráficos.</p>
      <div style={{ marginTop: '2rem' }}>
        <p>Exemplo: Lista de itens do banco de dados (placeholder).</p>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    </div>
  );
};

export default BD;