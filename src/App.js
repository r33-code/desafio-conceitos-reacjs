import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repositório: ${Date.now()}`,
      url: "github.com/r33-code/desafio-conceitos-reactjs",
      techs: [
        "Node.js",
        "Javascript",
        "Express"
      ]
    })

    const repository = response.data

    setRepositories([...repositories, repository])

  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`).then(() => {
      const repository = repositories.find(repository => repository.id === id)
      const newRepositories = [ ...repositories ]
      newRepositories.splice(repository, 1)
  
      setRepositories(newRepositories)
    })

  }

  return (
    <>
      <div>
        <ul data-testid="repository-list">
          {repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(`${repository.id}`)}>
                Remover
            </button>
            </li>
          ))}
        </ul>

        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    </>
  );
}

export default App;
