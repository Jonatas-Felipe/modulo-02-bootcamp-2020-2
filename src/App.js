import React, { useState, useEffect } from 'react';

import api from './services/api';

import './App.css';

import Header from './components/Header';

/**
 * Componente
 * Propriedade
 * Estado & Imutabilidade
 */

function App() {

  const [projects, setProject] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProject(response.data);
    });
  }, [])

  // useState retorn um array com 2 posições
  //
  // 1. Variavel com seu valor inicial
  // 2. Função para atualizarmos esse valor

  async function handleAddProject() {
    // setProject([...projects, `Novo projeto ${Date.now()}`]);

    const response = await api.post('projects',
      {
        title: `Novo projeto ${Date.now()}`,
        owner: "Jonatas"
      }
    );

    const project = response.data;
    setProject([...projects, project]);
  }

  return (
    <>
      <Header title="Page 2" />

      <ul>
        {projects.map(project => <li key={project.id}>Projeto: {project.title} | Reponsavel:  {project.owner}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  );
}

export default App;
