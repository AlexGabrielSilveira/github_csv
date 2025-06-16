import { Route, BrowserRouter, Routes } from "react-router-dom";
import SearchContainer from "./components/Search/SearchContainer";
import ImportCSV from "./pages/ImportCSV";
import { useEffect } from "react";
import io from "socket.io-client";
import { Toaster, toast } from "sonner";
import { API_BASE_URL } from "./config";

function App() {
  useEffect(() => {
    const socket = io(API_BASE_URL);
    socket.on("job_finished", (data: any) => {
      toast.success(data.message || "Processamento concluído com sucesso! 🚀");
    });
    socket.on("import_failed", (data: any) => {
      toast.error(data.message || "Falha na importação. ❌");
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors closeButton />
      <Routes> 
        <Route path="/" element={<SearchContainer />} />
        <Route path="/import" element={<ImportCSV />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
