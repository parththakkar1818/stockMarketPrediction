import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StockChart from "./stockChart";
// import StockDataTable from './stockDataTable';
import LoadingSpinner from "./loadingAnimation";
import notifyError from "./Notifications";
import { ToastContainer } from "react-toastify";

const PredictStockPage = () => {
  const [predictionData, setPredictionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { state: locationState } = location;
  const { startDate, endDate, stockSymbol, stockName } = locationState || {};
  const [passedStockData, setPassedStockData] = useState([]);

  useEffect(() => {
    if (locationState && locationState.stockData) {
      setPassedStockData(locationState.stockData);
    }
  }, [locationState]);
  // console.log("for fastapi: ",typeof(JSON.stringify(passedStockData)));

  // const predictStockPrice = async (
  //   startDate,
  //   endDate,
  //   stockSymbol,
  //   passedStockData
  // ) => {
  //   try {
  //     setLoading(true);
  //     const predictionResponse = await fetch(
  //       // `http://localhost:8000/predictstock`,
  //       `http://localhost:8000/predictstock?stock_symbol=${stockSymbol}&start=${startDate}&end=${endDate}&passed_stock_data=${JSON.stringify(
  //         passedStockData
  //       )}`,

  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         // body: JSON.stringify({
  //         //   stockSymbol: stockSymbol + ".NS",
  //         //   startDate: startDate,
  //         //   endDate: endDate,
  //         //   // passedStockData: JSON.stringify(passedStockData),
  //         // }),
  //       }
  //     );
  //     if (!predictionResponse.ok) {
  //       notifyError("Prediction failed due to some error.");
  //       console.log(predictionResponse);
  //       return;
  //     }
  //     const preData = await predictionResponse.json();
  //     setPredictionData(preData.predictions);
  //   } catch (error) {
  //     console.error("Error fetching stock data:", error);
  //     notifyError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const predictStockPrice = async (
    startDate,
    endDate,
    stockSymbol,
    passedStockData
  ) => {
    try {
      setLoading(true);
      const predictionResponse = await fetch(
        `http://localhost:8000/predictstock`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stockSymbol: stockSymbol+".NS",
            startDate: startDate,
            endDate: endDate,
            passedStockData: passedStockData,
          }),
        }
      );
      console.log(predictionResponse);
      if (!predictionResponse.ok) {
        notifyError("Prediction failed due to some error.");
        console.log(predictionResponse);
        return;
      }
      const preData = await predictionResponse.json();
      console.log(preData);
      setPredictionData(preData.predictions);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      notifyError(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="mb-9">
      <h2>Click below button to predict stock price for next 30 days:</h2>
      <button
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 m-2"
        onClick={() =>
          predictStockPrice(startDate, endDate, stockSymbol, passedStockData)
        }
      >
        Click here
      </button>

      <div>
        {loading && <LoadingSpinner />}

        {!loading &&
          passedStockData.length > 0 &&
          predictionData.length > 0 && (
            <>
              <h2>
                Prediction Data for {stockName} ({stockSymbol})
              </h2>
              <StockChart
                stockData={passedStockData}
                startDate={startDate}
                endDate={endDate}
                selectedStock={stockSymbol}
                predictedData={predictionData}
              />
              <p className="text-red-700">
                Disclaimer: This prediction tool is for educational purposes
                only. Investing in stocks involves risks, and decisions should
                be made based on careful research and consideration. Use this
                information at your own risk.
              </p>
            </>
          )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default PredictStockPage;
