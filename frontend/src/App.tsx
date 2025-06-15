import { Route, BrowserRouter, Routes } from "react-router-dom";
import SearchContainer from "./components/Search/SearchContainer";
import ImportCSV from "./pages/ImportCSV";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchContainer />}/>
          <Route path="/import" element={<ImportCSV />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
