import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import StockDataApp from "./components/stock";
import PredictStockPage from "./components/PredictStockPage";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Newspage from "./components/Newspage";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<StockDataApp />} />
        <Route
          // path="/predictstock/:startDate/:endDate/:stockSymbol"
          path="predict"
          element={<PredictStockPage />}
        />
        <Route
          path="/news"
          element={<Newspage/>}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
