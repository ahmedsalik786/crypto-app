import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import CoinPage from "./pages/Coin";
import ComparePage from "./pages/ComparePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/coin/:id" element={<CoinPage/>} />
          <Route path="/compare" element={<ComparePage/>} />
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
