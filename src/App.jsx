import { useState } from 'react';
import './App.css';

function App() {
  const [repositorios, setRepositorios] = useState([]);
  const [pesquisar, setPesquisar] = useState('');
  const [reposFiltrados, setReposFiltrados] = useState([]);

  const [avatar, setAvatar] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [quantidadeRepos, setQuantidadeRepos] = useState(0);

  async function handleSearch() {
    if (pesquisar.trim() === '') return;

    try {
      const response = await fetch(`https://api.github.com/users/${pesquisar}/repos`);
      
      if (!response.ok) {
        alert('Usuário não encontrado!');
        return;
      }

      const data = await response.json();
      setRepositorios(data);
      setReposFiltrados(data);

      if (data.length > 0) {
        setAvatar(data[0].owner.avatar_url);
        setNomeUsuario(data[0].owner.login);
        setQuantidadeRepos(data.length);
      } else {
        setAvatar('');
        setNomeUsuario('');
        setQuantidadeRepos(0);
      }
    } catch (error) {
      console.error('Erro ao buscar repositórios:', error);
      alert('Erro ao buscar repositórios!');
    }
  }

  const handleChange = (e) => {
    setPesquisar(e.target.value);
  };

  return (
    <>
      <div>
        <input
          placeholder="Digite o nome do usuário"
          value={pesquisar}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Buscar</button>

        {avatar && (
          <div className="perfil" style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '20px 0' }}>
            <img src={avatar} alt="Avatar" width={100} style={{ borderRadius: '50%' }} />
            <div>
              <h2>{nomeUsuario}</h2>
              <p>{quantidadeRepos} repositórios</p>
            </div>
          </div>
        )}

        <ul>
          {reposFiltrados.length > 0 ? (
            reposFiltrados.map(repo => (
              <li key={repo.id}>
                {repo.name}
              </li>
            ))
          ) : (
            nomeUsuario && <p>Nenhum repositório encontrado para este usuário.</p>
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
