import { Route, BrowserRouter, Routes } from "react-router-dom";
import SearchContainer from "./components/Search/SearchContainer";
import ImportCSV from "./pages/ImportCSV";
import { useEffect } from "react";
import io from "socket.io-client";
import { Toaster, toast } from "sonner";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("job_finished", (data: any) => {
      toast.success(data.message || "Processamento concluído com sucesso! 🚀");
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
