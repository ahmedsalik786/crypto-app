import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import CoinPage from "./pages/Coin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/coin/:id" element={<CoinPage/>} />
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
