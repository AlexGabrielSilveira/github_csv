import { ChangeEvent, useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import axios from "axios";
import Papa from 'papaparse'

function ImportCSV() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        if(data.length <=  0 ) return
            handleUpload()
    }, [data])

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
       const file = e.target.files?.[0]

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
                setData(parsedData);
           },
           error: (err) => {
            console.log("erro ao ler csv", err);
           }
         });
       }
    }
   const handleUpload = async () => {
        try {
            const API_URL = `${API_BASE_URL}/file/upload`;
            await axios.post(API_URL, data, {
                headers: { 'Content-Type': 'application/json' },
            }); 
            
        } catch (error) {
            console.log("erro!", error);
        }
    };
    return ( 
        <div className="flex flex-col h-screen bg-gray-900 p-8">
            <div className="flex items-center justify-between w-full static mt-4 mb-4">
                <input type="file" accept=".csv" onChange={handleFileChange} />
            </div>
            <div className="overflow-x-auto w-full">
                <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="px-4 py-2 border-b font-semibold text-gray-700">Nome do Repositório</th>
                        <th className="px-4 py-2 border-b font-semibold text-gray-700">Proprietário</th>
                        <th className="px-4 py-2 border-b font-semibold text-gray-700">Estrelas ⭐</th>
                        <th className="px-4 py-2 border-b font-semibold text-gray-700">Linguagem 🧠</th>
                    </tr>
                    </thead>
                    <tbody>
                      {data.map((repo: any) => (
                          <tr key={repo.name + repo.username}>
                            <td className="px-4 py-2 border-b text-white">{repo.repo_name}</td>
                            <td className="px-4 py-2 border-b text-white">{repo.username}</td>
                            <td className="px-4 py-2 border-b text-white">{repo.stargazers_count}</td>
                            <td className="px-4 py-2 border-b text-white">{repo.language || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ImportCSV;