import axios from "axios"
import React, { useState } from "react";
import { API_BASE_URL } from "../../config";
import RepositoriesModal from "../Modal/RepositoriesModal";
import SearchInput from "./SearchInput";
import UserCard from "../card/UserCard";

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
      console.log("Erro ao buscar usuário", error);
    }
  };

  const handleUserClick = () => {
    setModalState(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <SearchInput value={value} onChange={setValue} onSubmit={getUser} />
      {userData && <UserCard user={userData} onClick={handleUserClick} />}
      {modalState && userData && <RepositoriesModal login={userData.login} onClose={() => {
        setModalState(!modalState);
        setUserData(null);
      }}/>}
    </div>
  );
}
export default SearchContainer;
