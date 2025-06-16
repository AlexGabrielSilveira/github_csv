import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import axios from "axios";
import Papa from "papaparse";
import { toast, Toaster } from "sonner";
import { Link } from "react-router-dom";

function ImportCSV() {
  const [data, setData] = useState<any[]>([]);
  const[selectCSV, setSelectCSV] = useState<boolean>(true);
  const[filter, setFilter] = useState<string>('all')
  const[languages, setLanguages] = useState<string[]>([])
  useEffect(() => {

  }, [data])

  const filteredData = filter === 'all' ? data : data.filter((repo) => repo.language === filter);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const parsedData = result.data.map((item: any) => ({
            username: item.username,
            repo_name: item.repo_name,
            language: item.language,
            stars: Number(item.stars),
          }));
          
          const languages = Array.from(new Set(parsedData.map((data) => data.language).filter(Boolean)));
          setLanguages(languages);
          setData(parsedData);
          setSelectCSV(!selectCSV);
        },
        error: (err) => {
          toast.error("Erro ao ler CSV");
        },
      });
    }
  };

  const handleUpload = async () => {
    try {
      const API_URL = `${API_BASE_URL}/file/upload`;
      await axios.post(API_URL, data, {
        headers: { "Content-Type": "application/json" },
      });
      setData([])
      setSelectCSV(!selectCSV)
      setFilter('')
      setLanguages([])
    } catch (error) {
      toast.error("Erro ao enviar arquivo!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 py-8">
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-sm text-gray-500 mb-4">
          <span><Link to="/" className="font-bold"> 💻Pesquisa e Exportação</Link></span> &gt; <span className="font-bold text-blue-400">Importação e Visualização</span>
        </div>
        <Toaster position="top-right" richColors closeButton />
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Importação de CSV</h1>
          {selectCSV ? (
          <label className="inline-flex items-center cursor-pointer">
            <input type="file" accept=".csv" onChange={handleFileChange} className="hidden" id="file-upload" />
            <span className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Selecionar CSV</span> 
          </label>) : (
            <label className="inline-flex items-center cursor-pointer">
            <input type="submit" className="hidden" />
            <span className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition" onClick={handleUpload}>Salvar CSV</span> 
          </label>
          ) }
          
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <label className="text-sm font-medium text-gray-700">Filtrar por:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option value="all">Todos</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Nome do Repositório
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Proprietário
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Estrelas ⭐
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Linguagem 🧠
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((repo: any, index) => (
                  <tr key={repo.repo_name + repo.username + index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 text-sm text-gray-800">{repo.repo_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{repo.username}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{repo.stars}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{repo.language || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center px-6 py-4 text-sm text-gray-500"
                  >
                    Nenhum dado carregado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ImportCSV;

 