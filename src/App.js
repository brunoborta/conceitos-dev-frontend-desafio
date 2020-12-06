import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const repositories = await api.get("repositories");
      setRepositories(repositories.data);
    }
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `repositorio muito mais louco ${Date.now()}`,
      url: "http://github.com/brunoborta/algo",
      techs: ["vuejs", "reactJS", "react native"],
    });
    const newRepository = response.data;
    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    if (id) {
      await api.delete(`repositories/${id}`);
      const filteredRepositories = repositories.filter(
        (repository) => repository.id !== id
      );

      setRepositories([...filteredRepositories]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title, url }) => (
          <li key={id}>
            <a href={url}>{title}</a>
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
