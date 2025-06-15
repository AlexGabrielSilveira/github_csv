import axios from "axios";
import { API_BASE_URL } from "../../config";
import { useEffect, useState } from "react";

interface RepositoryInterface {
  name: string;
  stargazers_count: number;
  language: string;
  short_description?: string;
}
interface RepositoriesModalProps {
  login: string;
  onClose: () => void;
}
function RepositoriesModal({ login, onClose }: RepositoriesModalProps) {
  const [repositories, setRepositories] = useState<RepositoryInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserRepositories();
  }, []);

  const getUserRepositories = async () => {
    try {
      const API_URL = `${API_BASE_URL}/github/${login}/repos`;
      const response = await axios.get(API_URL);
      setRepositories(response.data);
    } catch (error) {
      console.log("erro ao buscar repositorios", error);
    } finally {
      setLoading(false);
    }
  };

  const exportUserRepos = async () => {
    const API_URL = `${API_BASE_URL}/github/${login}/export`;
    try {
      const response = await axios.get(API_URL, { responseType: 'blob'});
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;

      link.setAttribute('download', `${login}_repos.csv`);
      document.body.appendChild(link);

      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("Erro ao exportar repositorios:", error);
    }

  }
  const handleClick = () => {
    exportUserRepos();
    onClose()
  }
   return (
    <div className="p-6 bg-black opacity-85 rounded-lg text-white w-full h-full absolute">
      <div className="flex items-center justify-between flex-nowrap m-10">
        <h2 className="text-xl font-bold mb-4">Repositórios de {login} </h2>
        <button className="bg-red-400 rounded px-6 py-3 text-white" onClick={onClose}>X</button>
      </div>
      {loading ? (
        <p className="text-center text-gray-400 mt-20">Carregando...</p>
      ) : repositories.length === 0 ? (
        <p className="text-center text-gray-400 mt-20">
          Este usuário não possui repositórios públicos.
        </p>
      ) : (
        <>
          <ul className="space-y-4 max-h-[500px] overflow-y-auto">
            {repositories.map((repo, index) => (
              <li
                key={index}
                className="bg-gray-700 p-4 rounded-lg shadow"
              >
                <p className="text-lg font-semibold">{repo.name}</p>
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>🌐 {repo.language || "N/A"}</span>
                  <span>⭐ {repo.stargazers_count}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center mt-10">
            <button className="bg-green-400 rounded px-6 py-3 text-white" onClick={handleClick} >
              Exportar como CSV
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default RepositoriesModal;
