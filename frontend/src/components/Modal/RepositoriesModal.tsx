import axios from "axios";
import { API_BASE_URL } from "../../config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      alert("erro ao buscar repositorios!");
    } finally {
      setLoading(false);
    }
  };

  const exportUserRepos = async () => {
    const API_URL = `${API_BASE_URL}/github/${login}/export`;
    try {
      const response = await axios.get(API_URL, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${login}_repos.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao exportar repositorios:", error);
    }
  };

  const handleClick = () => {
    exportUserRepos();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-xl w-full p-6 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Repositórios de {login}
          </h2>
          <button
            onClick={onClose}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            Fechar
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Carregando...</p>
        ) : repositories.length === 0 ? (
          <p className="text-center text-gray-500">
            Este usuário não possui repositórios públicos.
          </p>
        ) : (
          <>
            <ul className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {repositories.map((repo, index) => (
                <li
                  key={index}
                  className="bg-gray-100 rounded-lg p-4 shadow flex flex-col"
                >
                  <p className="font-semibold text-gray-800">{repo.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {repo.short_description || "Sem descrição"}
                  </p>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>🌐 {repo.language || "N/A"}</span>
                    <span>⭐ {repo.stargazers_count}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-center items-center mt-8 gap-4">
              <button
                onClick={handleClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition w-full"
              >
                Exportar CSV
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RepositoriesModal;
