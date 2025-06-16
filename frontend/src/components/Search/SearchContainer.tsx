import axios from "axios";
import React, { useState } from "react";
import { API_BASE_URL } from "../../config";
import RepositoriesModal from "../Modal/RepositoriesModal";
import { Link } from "react-router-dom";
import { toast, Toaster } from "sonner";

export interface GithubUser {
  login: string;
  avatar_url: string;
  name: string;
}

function SearchContainer() {
  const [value, setValue] = useState("");
  const [userData, setUserData] = useState<GithubUser | null>(null);
  const [modalState, setModalState] = useState(false);

  const getUser = async () => {
    const githubLoginName = value.replace(/\s/g, "");
    try {
      const API_URL = `${API_BASE_URL}/github/${githubLoginName}`;
      const response = await axios.get(API_URL);

      setUserData(response.data);
    } catch (error) {
       toast.error("Erro ao buscar usuário!");
    }
  };

  const handleUserClick = () => {
    setModalState(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 py-10 px-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 relative">
        <Toaster position="top-right" richColors closeButton />
        <div className="absolute top-4 right-4">
          <Link to="/import" className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow transition"> Ir para Importação </Link>
        </div>

        <div className="text-sm text-gray-500 mb-4">
          <span className="font-semibold">💻Pesquisa e Exportação</span>
        </div>
        <h1 className="text-2xl font-bold mb-6">Busca de Repositórios GitHub</h1>

        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <input
            type="text"
            placeholder="Digite o nome do usuário GitHub"
            className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            onKeyDown={(e) => e.key === "Enter" && getUser()}
          />
          <button
            onClick={getUser}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Buscar
          </button>
        </div>

        {userData && (
          <div>
            <div className="border-t border-gray-200 pt-4">
              <div
                onClick={handleUserClick}
                className="cursor-pointer hover:bg-gray-100 p-4 rounded-lg transition"
              >
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow mb-4">
                  <div>
                    <p className="font-semibold text-lg text-gray-800">{userData.login}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                      ⭐ <span>Exibir repositórios!</span> ⭐
                    </div>
                  </div>
                  <img
                    src={userData.avatar_url}
                    alt={`Avatar de ${userData.login}`}
                    className="w-32 h-32 rounded-full shadow"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {modalState && userData && (
        <RepositoriesModal
          login={userData.login}
          onClose={() => {
            setModalState(false);
            setUserData(null);
          }}
        />
      )}
    </div>
  );
}

export default SearchContainer;