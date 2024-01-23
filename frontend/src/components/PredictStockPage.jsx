import React, { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom';
import StockChart from './stockChart';
// import StockDataTable from './stockDataTable';
import LoadingSpinner from './loadingAnimation';
import notifyError from './Notifications';
import { ToastContainer } from 'react-toastify';


const PredictStockPage = () => {
  // const { startDate, endDate, stockSymbol } = useParams();
  const [predictionData, setPredictionData] = useState([]);
  const [passedStockData, setPassedStockData] = useState([]);
  const location = useLocation();
  const { state: locationState } = location;
  const { startDate, endDate , stockSymbol , stockName} = locationState || {};
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (locationState && locationState.stockData) {
      // Set stockData from location state if available
      setPassedStockData(locationState.stockData);
    }
  }, [locationState]);
  // console.log(passedStockData);
  // console.log(startDate,endDate,stockSymbol);
  
  const predictStockPrice = async (startDate , endDate , stockSymbol) => {
    try {
      setLoading(true);
      const predictionResponse = await fetch(`https://stock-market-prediction-backend-6p1ue8lit.vercel.app/predictstock/${startDate}/${endDate}/${stockSymbol}`,{
        method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stockSymbol: stockSymbol+".NS",
            startDate: startDate,
            endDate: endDate,
          }),
      });
      if (!predictionResponse.ok) {
        notifyError("Prediction failed due to some error.")
        return;
      }
      const preData = await predictionResponse.json();
      setPredictionData(preData.predictionDataInJSON);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      notifyError(error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  }
  

  return (
    <div className='mb-9'>
      
      <h2>Click below buttton to predict stock price for next 30 days: </h2>
      <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 m-2"
        onClick={() => predictStockPrice(startDate, endDate, stockSymbol)}
      >
        Click here
      </button>

      <div>
        {loading && <LoadingSpinner />}
      
        {!loading && passedStockData.length>0 && predictionData.length>0 && (
          <>
            <h2>Prediction Data for {stockName} ( {stockSymbol} ) </h2>
            <StockChart
              stockData={passedStockData}
              startDate={startDate}
              endDate={endDate}
              selectedStock={stockSymbol}
              predictedData={predictionData}
            />
            <p className='text-red-700'>
              Disclaimer: This prediction tool is for educational purposes only. Investing in stocks involves risks,
              and decisions should be made based on careful research and consideration.
              Use this information at your own risk.
            </p>
            
          </>
        )}


      </div>

      <ToastContainer />
    </div>
  );
};




export default PredictStockPage;
